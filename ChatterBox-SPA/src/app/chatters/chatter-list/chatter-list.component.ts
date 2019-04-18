import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-chatter-list",
  templateUrl: "./chatter-list.component.html",
  styleUrls: ["./chatter-list.component.css"]
})
export class ChatterListComponent implements OnInit {
  users: User[];

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.loadUsers();
    this.route.data.subscribe(data => {
      this.users = data["users"];
    });
  }

  // loadUsers() {
  //   this.userService.getUsers().subscribe(
  //     (users: User[]) => {
  //       this.users = users;
  //     },
  //     error => {
  //       this.alertify.error(error);
  //     }
  //   );
  // }
}
