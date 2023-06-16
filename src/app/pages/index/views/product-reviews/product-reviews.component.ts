import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-reviews',
  templateUrl: './product-reviews.component.html',
  styleUrls: ['./product-reviews.component.css'],
})
export class ProductReviewsComponent implements OnInit {
  @Input() reviews: any[] = [];
  constructor() {}

  ngOnInit() {}
}
