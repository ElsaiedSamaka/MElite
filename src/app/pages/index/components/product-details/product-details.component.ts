import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/core/services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.getProduct();
  }
  getProduct() {
    this.route.data.subscribe((data) => {
      this.product = data['product'];
    });
  }
  postCartItem(product: any): void {
    this.product = product;
    // TODO: check the availablity of product and if it's not available will prevent posting cartItem
    // TODO: reach to the current user through usersService or authSerivce and get current user
    // and replace the hard coded userId with current user id
    let cartItem = {
      productId: product.id,
      quantity: 1,
      userId: 1,
    };
    this.cartService.post(cartItem).subscribe({
      next: (cartItem) => {},
      error: (err) => {
        console.log('error while posting cart item', err);
      },
      complete: () => {},
    });
  }
}
