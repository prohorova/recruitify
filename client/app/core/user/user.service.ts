import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  login(data) {
    return this.http.post('/api/login', data)
      .map(res => res.json())
      .catch(err => Observable.throw(err.json()))
  }

  register(data) {
    return this.http.post('/api/register', data)
      .map(res => res.json())
      .catch(err => Observable.throw(err.json()))
  }

  confirm(token) {
    return this.http.post('/api/confirm', {token})
      .map(res => res.json())
      .catch(err => Observable.throw(err.json()))
  }

}
