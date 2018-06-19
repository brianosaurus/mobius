import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs';
import { Angular2TokenService } from "angular2-token";

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

@Injectable()
export class UsersService {

  private host: string = ""
  private url: string = this.host + "api/v1/users";

  constructor(private http: Http) { }

  getUsers(tokenAuthService:Angular2TokenService){
    return tokenAuthService.get(this.url)
      .map(res => res.json());
  }

  // not needed
  getUser(tokenAuthService:Angular2TokenService, id){
    return tokenAuthService.get(this.getUserUrl(id))
      .map(res => res.json());
  }

  getBalance(tokenAuthService:Angular2TokenService){
    return tokenAuthService.get(this.host + "api/v1/current")
      .map(res => res.json());
  }

  sendToUser(tokenAuthService:Angular2TokenService, user, amount){
    return tokenAuthService.put(this.getUserUrl(user) + '/make_payment', {amount: JSON.stringify(amount)})
  }

  private getUserUrl(id){
    return this.url + "/" + id;
  }
}
