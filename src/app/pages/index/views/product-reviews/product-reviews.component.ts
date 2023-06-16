import { Component, Input, OnInit } from '@angular/core';
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
}
