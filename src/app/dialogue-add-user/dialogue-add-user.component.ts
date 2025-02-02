import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideFirestore } from '@angular/fire/firestore';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import {
  Firestore,
  collection,
  addDoc,
  getFirestore,
} from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogue-add-user',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogTitle,
    MatDialogActions,
    MatDialogContent,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    MatProgressBarModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dialogue-add-user.component.html',
  styleUrl: './dialogue-add-user.component.scss',
})
export class DialogueAddUserComponent {
  user: User = new User();
  birthDate: Date;
  loading = false;
  private firestore = inject(Firestore);

  constructor(public dialogRef: MatDialogRef<DialogueAddUserComponent>) {
    this.birthDate = new Date();
  }

  async saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    this.loading = true;

    try {
      const usersCollection = collection(this.firestore, 'users');

      const result = await addDoc(usersCollection, this.user.toJSON());
      this.loading = false;
      this.dialogRef.close();
    } catch (error) {
      console.error('Error adding user:', error);
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
    }
  }
}
