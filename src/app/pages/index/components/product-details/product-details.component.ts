import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {}
  getProduct() {
    this.route.data.subscribe((data) => {
      this.product = data['product'];
    });
  }
}
