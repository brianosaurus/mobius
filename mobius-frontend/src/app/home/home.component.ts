import { Component, OnInit } from '@angular/core';
import { Angular2TokenService } from "angular2-token";
import { UsersService } from '../users.service';
import {User} from "../user";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})

export class HomeComponent implements OnInit {
  private users: User[] = [];
  private balance: number;
  private email: string;
  
  signInUser = {
    email: '',
    balance: ''
  };

  constructor(public tokenAuthService:Angular2TokenService, private usersService:UsersService) { }

  ngOnInit() {
    this.usersService.getUsers(this.tokenAuthService)
      .subscribe(data => this.users = data);

    this.usersService.getBalance(this.tokenAuthService)
      .subscribe(data => this.signInUser = data);
  }

  reloadData() {
    this.usersService.getBalance(this.tokenAuthService)
      .subscribe(data => this.signInUser = data);
  }

  // not needed
  getUser(user) {
    this.usersService.getUser(this.tokenAuthService, user);
  }
}
