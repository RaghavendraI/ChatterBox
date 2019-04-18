import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-chatter-card',
  templateUrl: './chatter-card.component.html',
  styleUrls: ['./chatter-card.component.css']
})
export class ChatterCardComponent implements OnInit {
  @Input() user: User;
  constructor() { }

  ngOnInit() {
  }

}
