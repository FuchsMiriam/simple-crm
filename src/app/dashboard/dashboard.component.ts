import { Component, inject, ViewChild, AfterViewInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ChartOptions, ChartType } from 'chart.js';
import { MatListModule } from '@angular/material/list';
import { BaseChartDirective } from 'ng2-charts';
import {
  Firestore,
  collection,
  collectionData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {
  Chart as ChartJS,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { User } from '../../models/user.class';
import { limit, onSnapshot, orderBy, query} from 'firebase/firestore';

ChartJS.register(DoughnutController, ArcElement, Tooltip, Legend);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements AfterViewInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  private firestore = inject(Firestore);
  public totalUsers: number = 0;
  public users$: Observable<any[]>;
  userId!: string;
  public recentChanges: { user: string; oldInfo: any; newInfo: any }[] = [];
  oldUserDataCache: { [docId: string]: User } = {};

  //Total number of users

  constructor() {
    const usersCollection: any = collection(this.firestore, 'users');
    this.users$ = collectionData(usersCollection, { idField: 'id' });

    this.users$.subscribe((users) => {
      this.totalUsers = users.length;
      this.groupUsersByDepartment(users);
    });
  }

  //Donut chart logic

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.chart) {
        this.chart.update();
      }
    }, 0);
  }

  public donutChartLabels: string[] = [];
  public donutChartData: any = {
    labels: this.donutChartLabels,
    datasets: [
      {
        labels: 'Departments',
        data: [],
        backgroundColor: [
          'rgba(0, 77, 96, 1)',
          'rgba(0, 188, 212, 1)',
          'rgba(255, 0, 127, 1)',
          'rgba(255, 102, 153, 1)',
          'rgba(0, 60, 75, 1)',
          'rgba(0, 100, 120, 1)',
          'rgba(0, 210, 230, 1)',
          'rgba(204, 0, 102, 1)',
          'rgba(255, 51, 140, 1)',
          'rgba(255, 130, 170, 1)',
        ],
        hoverBackgroundColor: [
          'rgba(0, 77, 96, 0.7)',
          'rgba(0, 188, 212, 0.7)',
          'rgba(255, 0, 127, 0.7)',
          'rgba(255, 102, 153, 1)',
          'rgba(0, 60, 75, 1)',
          'rgba(0, 100, 120, 1)',
          'rgba(0, 210, 230, 1)',
          'rgba(204, 0, 102, 1)',
          'rgba(255, 51, 140, 1)',
          'rgba(255, 130, 170, 1)',
        ],
      },
    ],
  };
  donutChartType: ChartType = 'doughnut';

  public donutChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 16,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    elements: {
      arc: {
        borderWidth: 1,
      },
    },
    layout: {
      padding: 20,
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

    this.donutChartLabels.length = 0;
    this.donutChartLabels.push(...departmentNames);

    this.donutChartLabels = [...departmentNames];
    this.donutChartData.datasets[0].data = departmentCounts;

    if (this.chart) {
      this.chart.update();
    }
  }

  //Recent changes
  ngOnInit() {
    const changesRef = collection(this.firestore, 'recentChanges');
    const q = query(changesRef, orderBy('timestamp', 'desc'), limit(3));
  
    onSnapshot(q, (snapshot) => {
      this.recentChanges = snapshot.docs.map(doc => doc.data() as { 
        user: string; 
        oldInfo: any; 
        newInfo: any; 
      });
    });
  }

  getChangedFields(oldInfo: any, newInfo: any) {
    const changes: { field: string; oldValue: any; newValue: any }[] = [];
  
    Object.keys(oldInfo).forEach(key => {
      if (oldInfo[key] !== newInfo[key]) {
        changes.push({
          field: key,
          oldValue: oldInfo[key],
          newValue: newInfo[key]
        });
      }
    });
  
    return changes;
  }
  
         
}
