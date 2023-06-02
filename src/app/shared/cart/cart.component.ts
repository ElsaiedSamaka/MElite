import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/core/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  showCartDropdown = false;
  cartItems: any[] = [];
  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.getCartItems();
  }
  getCartItems(): void {
    this.cartService.getAll().subscribe({
      next: (cartItems) => {
        this.cartItems = this.cartService.items$.value;
      },
      error: (err) => {
        console.log('error while returning cart item', err);
      },
      complete: () => {},
    });
  }
  toggleCartDropDown() {
    if (!this.showCartDropdown) {
      this.getCartItems();
    }

    this.showCartDropdown = !this.showCartDropdown;
  }
}
