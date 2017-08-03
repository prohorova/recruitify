import { Component, OnInit } from '@angular/core';
import { ReviewsService } from '../services/reviews.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  reviews: any[];

  constructor(private reviewsService: ReviewsService) { }

  ngOnInit() {
    this.reviewsService.getReviews()
      .subscribe(res => {
        this.reviews = res;
      }, err => {
      })
  }

}
