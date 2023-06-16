import { Component, Input, OnInit } from '@angular/core';
import { ReviewsService } from 'src/core/services/reviews.service';

@Component({
  selector: 'app-product-reviews',
  templateUrl: './product-reviews.component.html',
  styleUrls: ['./product-reviews.component.css'],
})
export class ProductReviewsComponent implements OnInit {
  @Input() reviews: any[] = [];
  sum: number = 0;
  average: number = 0;
  ratedStars: any[] = [];
  unratedStars: any[] = [];
  constructor(private reviewsService: ReviewsService) {}

  ngOnInit() {
    this.sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    this.average = this.sum / this.reviews.length;
    this.ratedStars = Array.from({ length: this.average }, (_, i) => i + 1);
    this.unratedStars = [...Array(5 - this.ratedStars.length).keys()];
    console.log(this.ratedStars);
  }
}
