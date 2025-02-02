import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../../models/user.class';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DialogueEditAddressComponent } from '../dialogue-edit-address/dialogue-edit-address.component';
import { DialogueEditUserComponent } from '../dialogue-edit-user/dialogue-edit-user.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatMenuModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent implements OnInit {
  userId = '';
  user: User = new User();
  user$!: Observable<User>;

  constructor(private route: ActivatedRoute, private firestore: Firestore, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
      this.getUser();
    });
  }

  getUser() {
    const userDocRef = doc(this.firestore, `users/${this.userId}`);
    this.user$ = docData(userDocRef) as Observable<User>;
    this.user$.subscribe((user) => {
      this.user = new User(user);
    });
  }

  editUserDetail() {
    const dialogue = this.dialog.open(DialogueEditUserComponent);
    dialogue.componentInstance.user = new User(this.user.toJSON());
    dialogue.componentInstance.userId = this.userId;

  }

  editAddressDetail() {
    const dialogue = this.dialog.open(DialogueEditAddressComponent);
    dialogue.componentInstance.user = new User(this.user.toJSON());
    dialogue.componentInstance.userId = this.userId;
  }
}
