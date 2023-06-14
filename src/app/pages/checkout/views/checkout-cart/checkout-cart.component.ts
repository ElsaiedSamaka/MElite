import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/core/services/cart.service';

@Component({
  selector: 'app-checkout-cart',
  templateUrl: './checkout-cart.component.html',
  styleUrls: ['./checkout-cart.component.css'],
})
export class CheckoutCartComponent implements OnInit {
  cartItems: any[] = [];
  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.getCartItems();
  }
  getCartItems(): void {
    this.cartService.getUserCarts().subscribe({
      next: (cartItems) => {
        this.cartItems = this.cartService.items$.value;
      },
      error: (err) => {
        console.log('error while returning cart item', err);
      },
      complete: () => {},
    });
  }
  deleteCartItem(id: string): void {
    this.cartService.deleteById(id).subscribe({
      next: (deletedCartItem) => {
        this.cartItems = this.cartService.items$.value;
      },
      error: (err) => {
        console.log('error while deleteCartItem', err);
      },
      complete: () => {},
    });
  }
  updateCartItem(id: string, cartItem: any): void {
    this.cartService.put(id, cartItem).subscribe({
      next: (updatedCartItem) => {},
      error: (err) => {
        console.log('error while updateCartItem', err);
      },
      complete: () => {},
    });
  }
  increaseCartItemQty(id: string, cartItem: any): void {
    const updatedCartItem = {
      ...cartItem,
      quantity: cartItem.quantity + 1,
      price: cartItem.product.price * (cartItem.quantity + 1),
    };
    this.cartService.put(id, updatedCartItem).subscribe({
      next: async (updatedCartItem) => {
        this.cartItems = this.cartService.items$.value;
      },
      error: (err) => {
        console.log('error while updateCartItem', err);
      },
      complete: () => {},
    });
  }
  decreaseCartItemQty(id: string, cartItem: any): void {
    const updatedCartItem = {
      ...cartItem,
      quantity: cartItem.quantity - 1,
      price: cartItem.price - cartItem.product.price,
    };

    this.cartService.put(id, updatedCartItem).subscribe({
      next: async (updatedCartItem) => {
        this.cartItems = this.cartService.items$.value;
      },
      error: (err) => {
        console.log('error while updateCartItem', err);
      },
      complete: () => {},
    });
  }
}
