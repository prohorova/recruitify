import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class FeedbackService {

  constructor(private http: Http) { }

  getQuestions() {
    return this.http.get('/api/questions')
      .map(res => res.json())
      .catch(err => Observable.throw(err.json()))
  }

  leaveFeedback(data) {
    return this.http.post('/api/feedback', data)
      .map(res => res.json())
      .catch(err => Observable.throw(err.json()))
  }

}
