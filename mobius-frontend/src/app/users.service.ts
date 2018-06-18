import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class UsersService {

  private host: string = "http://localhost:3000"
  private url: string = host + "/users";

  constructor(private http: Http) { }

  getUsers(){
    return this.http.get(this.url)
      .map(res => res.json());
  }

  getUser(id){
    return this.http.get(this.getUserUrl(id))
      .map(res => res.json());
  }

  getBalance(){
    return this.http.get(this.host + "/api/v1/current")
      .map(res => res.json());
  }

  sendToUser(user, amount){
    return this.http.put(this.getUserUrl(user.id), JSON.stringify(user) + '/send/?amount=' + JSON.stringify(amount))
      .map(res => res.json());
  }

  private getUserUrl(id){
    return this.url + "/" + id;
  }
}
