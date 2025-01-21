import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogueAddUserComponent } from '../dialogue-add-user/dialogue-add-user.component';

@Component({
  selector: 'app-users',
  imports: [MatButtonModule, MatIconModule, MatTooltipModule, MatDialogModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  constructor(public dialog: MatDialog) {}

  openDialogue() {
    this.dialog.open(DialogueAddUserComponent);
  }
}
