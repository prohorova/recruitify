import { Component, OnInit } from '@angular/core';
import { ReviewsService } from '../services/reviews.service';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  reviews: any[];

  constructor(private auth: AuthService,
              private reviewsService: ReviewsService) { }

  ngOnInit() {
    let userId = this.auth.getUser()._id;
    this.reviewsService.getReviews(userId)
      .subscribe(res => {
        this.reviews = res;
      }, err => {
      })
  }

}
