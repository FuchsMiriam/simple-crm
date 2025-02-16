import { Component, inject } from '@angular/core';
import {
  MatDialog,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { User } from '../../models/user.class';
import { CommonModule } from '@angular/common';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';

@Component({
  selector: 'app-dialogue-edit-department',
  imports: [
    CommonModule,
    MatDialogActions,
    MatDialogModule,
    MatDialogContent,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatProgressBarModule,
  ],
  templateUrl: './dialogue-edit-department.component.html',
  styleUrl: './dialogue-edit-department.component.scss',
})
export class DialogueEditDepartmentComponent {
  user!: User;
  userId!: string;

  loading = false;
  private firestore = inject(Firestore);

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogueEditDepartmentComponent>
  ) {}

  async editDepartment() {
    this.loading = true;
    try {
      const userRef = doc(this.firestore, 'users', this.userId);

      // Holen der aktuellen (alten) Benutzerdaten
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        throw new Error('User not found');
      }
      const oldUserData = userSnap.data();

      // Aktualisieren der Benutzerdaten
      await updateDoc(userRef, this.user.toJSON());

      // Speichern der Änderung in einer separaten "recentChanges"-Sammlung
      await this.logChange(oldUserData, this.user.toJSON());

      this.loading = false;
      this.dialogRef.close();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }

  async logChange(oldData: any, newData: any) {
    const changesRef = collection(this.firestore, 'recentChanges');

    await addDoc(changesRef, {
      user: this.userId,
      oldInfo: oldData,
      newInfo: newData,
      timestamp: new Date(),
    });
  }
}
