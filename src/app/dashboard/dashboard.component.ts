import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ChartOptions, ChartType } from 'chart.js';
import { MatListModule } from '@angular/material/list';
import { BaseChartDirective } from 'ng2-charts';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {
  Chart as ChartJS,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(DoughnutController, ArcElement, Tooltip, Legend);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  
})
export class DashboardComponent {
  private firestore = inject(Firestore);
  public totalUsers: number = 0;
  public users$: Observable<any[]>;
  public recentChanges: { user: string; oldInfo: string; newInfo: string }[] =
    [];

  //Total number of users
  constructor() {
    const usersCollection = collection(this.firestore, 'users');
    this.users$ = collectionData(usersCollection, { idField: 'id' });

    this.users$.subscribe((users) => {
      this.totalUsers = users.length;
      this.groupUsersByDepartment(users);
    });
  }

  //Donut chart logic
  public donutChartLabels: string[] = [];
  public donutChartData: any = {
    labels: this.donutChartLabels,
    datasets: [
      {
        data: [],
        backgroundColor: [
          'rgba(0, 77, 96, 1)',
          'rgba(0, 188, 212, 1)',
          'rgba(255, 0, 127, 1)',
        ],
        hoverBackgroundColor: [
          'rgba(0, 77, 96, 0.7)',
          'rgba(0, 188, 212, 0.7)',
          'rgba(255, 0, 127, 0.7)',
        ],
      },
    ],
  };
  donutChartType: ChartType = 'doughnut';

  public donutChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  groupUsersByDepartment(users: any[]) {
    const departmentNames: string[] = [];
    const departmentCounts: number[] = [];
  
    users.forEach((user) => {
      const department = user.department || 'Unknown';
      const departmentIndex = departmentNames.indexOf(department);
  
      if (departmentIndex === -1) {
        departmentNames.push(department);
        departmentCounts.push(1);
      } else {
        departmentCounts[departmentIndex]++;
      }
    });  

    this.donutChartLabels = departmentNames;
    this.donutChartData.datasets[0].data = departmentCounts;  
  }

  //Recent changes logic
}
