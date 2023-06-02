import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/core/services/cart.service';
import { OrdersService } from 'src/core/services/orders.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  cartItems: any[] = [];

  constructor(
    private cartService: CartService,
    private ordersService: OrdersService
  ) {}

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
    };
    this.cartService.put(id, updatedCartItem).subscribe({
      next: (updatedCartItem) => {
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
    };
    this.cartService.put(id, updatedCartItem).subscribe({
      next: (updatedCartItem) => {
        this.cartItems = this.cartService.items$.value;
      },
      error: (err) => {
        console.log('error while updateCartItem', err);
      },
      complete: () => {},
    });
  }
  createOrder(cartItems: any): void {
    let order = cartItems.map((item) => {
      return {
        // currently on the backend we are using the current user id for placeing an order
        // so we don't really need to pass userId like the line below and we can remove it
        userId: item.userId,
        productIds: item.productId,
        quantity: item.quantity,
      };
    });
    this.ordersService.post(order).subscribe({
      next: () => {},
      error: () => {},
      complete: () => {},
    });
  }
}
