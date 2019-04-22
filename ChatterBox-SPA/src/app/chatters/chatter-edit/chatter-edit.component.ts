import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/_models/user';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-chatter-edit',
  templateUrl: './chatter-edit.component.html',
  styleUrls: ['./chatter-edit.component.css']
})
export class ChatterEditComponent implements OnInit {
  user: User;
  photoUrl: string;
  @ViewChild('editForm') editForm: NgForm;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });

     this.authService.currenPhotoUrl.subscribe(
       photoUrl => (this.photoUrl = photoUrl)
     );
  }

  updateUser() {
    this.userService
      .updateUser(this.authService.decodedToken.nameid, this.user)
      .subscribe(
        next => {
          this.alertify.success('Profile updated !!!');
          this.editForm.reset(this.user);
        },
        error => {
          this.alertify.error(error);
        }
      );
  }

  updateMainPhoto(photoUrl){
    this.user.photoUrl= photoUrl;
  }
}
