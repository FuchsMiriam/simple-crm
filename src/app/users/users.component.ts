import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogueAddUserComponent } from '../dialogue-add-user/dialogue-add-user.component';
import { User } from '../../models/user.class';
import { MatCardModule } from '@angular/material/card';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { NgFor } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { deleteDoc, doc } from 'firebase/firestore';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatCardModule,
    NgFor,
    RouterLink
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  user: User = new User();
  users$!: Observable<any[]>;
  allUsers: any[] = [];

  private firestore = inject(Firestore); 

  constructor(public dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    const usersCollection = collection(this.firestore, 'users');
    this.users$ = collectionData(usersCollection, { idField: 'customIdName' });

    this.users$.subscribe((changes) => {
      this.allUsers = changes;
    });
  }

  openDialogue() {
    const buttonElement = document.activeElement as HTMLElement;
    this.dialog.open(DialogueAddUserComponent);
    buttonElement.blur(); 
  }

  getFormattedBirthDate(date: number): string {
    return new Date(date).toLocaleDateString('en-EN');
  }

  deleteUser(userId: string) {
    const userRef = doc(this.firestore, 'users', userId);
    
    deleteDoc(userRef)
      .then(() => {
        this.router.navigate(['/users']);
      })
      .catch((error) => {
        console.error('Fehler beim Löschen des Users:', error);
      });
  }
}
