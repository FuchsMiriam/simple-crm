import { Component } from '@angular/core';
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

@Component({
  selector: 'app-dialogue-add-user',
  imports: [
    MatDialogTitle,
    MatDialogActions,
    MatDialogContent,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dialogue-add-user.component.html',
  styleUrl: './dialogue-add-user.component.scss',
})
export class DialogueAddUserComponent {
  user: User = new User();
  birthDate: Date;

  constructor() {
    this.birthDate = new Date();
  }

  saveUser(){
    this.user.birthDate = this.birthDate.getTime();
    console.log('Current User', this.user);
  }
}
