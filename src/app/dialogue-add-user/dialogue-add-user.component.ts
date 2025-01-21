import { Component } from '@angular/core';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-dialogue-add-user',
  imports: [MatDialogTitle, MatDialogActions, MatDialogContent, MatButtonModule, MatInputModule, MatFormFieldModule, MatDatepickerModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dialogue-add-user.component.html',
  styleUrl: './dialogue-add-user.component.scss',
})
export class DialogueAddUserComponent {}
