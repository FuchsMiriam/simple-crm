import { Component, inject } from '@angular/core';
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
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialogue-add-user',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogActions,
    MatDialogContent,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dialogue-add-user.component.html',
  styleUrl: './dialogue-add-user.component.scss',
})
export class DialogueAddUserComponent {
  user: User = new User();
  birthDate: Date;
  private firestore = inject(Firestore);

  constructor() {
    this.birthDate = new Date();
  }

  async saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    console.log('Current User', this.user);

    try {
      const usersCollection = collection(this.firestore, 'users');

      const result = await addDoc(usersCollection, this.user.toJSON());
      console.log('Adding user finished', result);
    } catch (error) {
      console.error('Error adding user:', error);
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
    }
  }
}
