import { Component } from '@angular/core';
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

@Component({
  selector: 'app-dialogue-edit-address',
  standalone: true,
  imports: [CommonModule, MatDialogActions, MatDialogModule, MatDialogContent, MatButtonModule, MatInputModule, MatFormFieldModule, FormsModule, MatProgressBarModule],
  templateUrl: './dialogue-edit-address.component.html',
  styleUrl: './dialogue-edit-address.component.scss'
})
export class DialogueEditAddressComponent {
  user!: User;

  loading = false;

  constructor (public dialog: MatDialog, public dialogRef: MatDialogRef<DialogueEditAddressComponent>){}


  saveUser(){}
}
