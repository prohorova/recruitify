import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ReviewsService {

  constructor(private authHttp: AuthHttp) { }

  getReviews(userId) {
    return this.authHttp.get(`/api/feedback?user=${userId}`)
      .map(res => res.json())
      .catch(err => Observable.throw(err.json()));
  }

}
