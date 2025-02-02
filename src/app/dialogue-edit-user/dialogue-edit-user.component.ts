import { Component, inject } from '@angular/core';
import {
  MatDialog,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { User } from '../../models/user.class';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { doc, updateDoc } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-dialogue-edit-user',
  imports: [CommonModule, MatDialogActions, MatDialogModule, MatDialogContent, MatButtonModule, MatInputModule, MatFormFieldModule, FormsModule, MatProgressBarModule, MatDatepickerModule],
   providers: [provideNativeDateAdapter()],
  templateUrl: './dialogue-edit-user.component.html',
  styleUrl: './dialogue-edit-user.component.scss'
})
export class DialogueEditUserComponent {
  user!: User;
  userId!: string;
  birthDate!: Date;

  loading = false;
  private firestore = inject(Firestore);

  constructor (public dialog: MatDialog, public dialogRef: MatDialogRef<DialogueEditUserComponent>){

  }


  ngOnInit() {
    if (this.user) {
      this.birthDate = this.user.birthDate ? new Date(this.user.birthDate) : new Date();
    } else {
      console.error('User data is missing');
    }
  }

  async editUser(){
     this.user.birthDate = this.birthDate.getTime();
        this.loading = true;
    
        try {
          const userRef = doc(this.firestore, 'users', this.userId);
    
          const result = await updateDoc(userRef, this.user.toJSON()); 
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
