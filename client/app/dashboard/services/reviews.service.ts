import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { AuthService } from '../../core/auth/auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ReviewsService {

  constructor(private authHttp: AuthHttp,
              private authService: AuthService) { }

  getReviews() {
    return this.authHttp.get(`/api/feedback`)
      .map(res => res.json())
      .catch(err => {
        if (err.status === 401) {
          this.authService.logout();
        }
        return Observable.throw(err.json());
      });
  }

}
