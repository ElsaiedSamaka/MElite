import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReviewsService } from 'src/core/services/reviews.service';

@Component({
  selector: 'app-product-reviews',
  templateUrl: './product-reviews.component.html',
  styleUrls: ['./product-reviews.component.css'],
})
export class ProductReviewsComponent implements OnInit {
  @Input() reviews: any[] = [];
  constructor(private reviewsService: ReviewsService) {}

  ngOnInit() {}
  reviewForm = new FormGroup({
    rating: new FormControl(''),
    review: new FormControl(''),
  });
  postReview(review: any): void {
    // this.reviewsService.post()
  }
  updatedReview(id: string, review: any): void {
    // this.reviewsService.put()
  }
  deleteReview(id: string): void {
    // this.reviewsService.deleteById(id)
  }
}
