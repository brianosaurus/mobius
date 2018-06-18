import { Component, OnInit } from '@angular/core';
import { Angular2TokenService } from "angular2-token";
import { UsersService } from '../users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})

export class HomeComponent implements OnInit {

  constructor(public tokenAuthService:Angular2TokenService, usersService:UsersService) { }

  ngOnInit() {
  }

  sendToUser(user, amount) {
    usersService.sendToUser(user, amount);
  }

  getUsers() {
  }

  getUser(user) {
  }
}
