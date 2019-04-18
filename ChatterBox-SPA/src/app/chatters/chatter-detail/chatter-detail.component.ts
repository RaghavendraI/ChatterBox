import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chatter-detail',
  templateUrl: './chatter-detail.component.html',
  styleUrls: ['./chatter-detail.component.css']
})
export class ChatterDetailComponent implements OnInit {
  user: User;
  constructor(private userService: UserService, private alertify: AlertifyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    // this.loadUser();
    this.route.data.subscribe(data =>{
      this.user = data['user'];
    });
  }

  // loadUser(){
  //   this.userService.getUser(+this.route.snapshot.params['id']).subscribe((user: User) =>{
  //     this.user= user;
  //   },error =>{
  //     this.alertify.error(error);
  //   })
  // }

}
