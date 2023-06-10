import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/core/services/cart.service';
import { OrdersService } from 'src/core/services/orders.service';

@Component({
  selector: 'app-payement-datails',
  templateUrl: './payement-datails.component.html',
  styleUrls: ['./payement-datails.component.css'],
})
export class PayementDatailsComponent implements OnInit {
  cartItems: any = [];

  selectedCardID = 0;

  constructor(
    private ordersService: OrdersService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.cartItems = this.cartService.items$.value;
    console.log('payement-datails [cartItems]', this.cartItems);
  }
  createOrder(cartItems: any): void {
    let order = cartItems.map((item) => {
      return {
        // currently on the backend we are using the current user id for placeing an order
        // so we don't really need to pass userId like the line below and we can remove it
        userId: item.userId,
        productIds: item.productId,
        quantity: item.quantity,
        price: item.price,
      };
    });
    this.ordersService.post(order).subscribe({
      next: (res) => {
        // this.toggleConfirmationModal();
      },
      error: () => {},
      complete: () => {},
    });
  }
  onCardSelect(id: any): void {
    if (this.selectedCardID === id) {
      this.selectedCardID = 0;
    } else {
      this.selectedCardID = id;
    }
  }
}
