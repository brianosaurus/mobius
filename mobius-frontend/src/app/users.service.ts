import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { map } from 'rxjs/operators';
import { Observable, from } from 'rxjs';
import { Angular2TokenService } from "angular2-token";

@Injectable()
export class UsersService {

  private host: string = ""
  private url: string = this.host + "api/v1/users";

  constructor(private http: Http) { }

  getUsers(tokenAuthService:Angular2TokenService){
    return tokenAuthService.get(this.url)
      .pipe(map(res => res.json()));
  }

  // not needed
  getUser(tokenAuthService:Angular2TokenService, id){
    return tokenAuthService.get(this.getUserUrl(id))
      .pipe(map(res => res.json()));
  }

  getBalance(tokenAuthService:Angular2TokenService){
    return tokenAuthService.get(this.host + "api/v1/current")
      .pipe(map(res => res.json()));
  }

  sendToUser(tokenAuthService:Angular2TokenService, user, amount){
    return tokenAuthService.put(this.getUserUrl(user) + '/make_payment', {amount: JSON.stringify(amount)})
  }

  private getUserUrl(id){
    return this.url + "/" + id;
  }
}
