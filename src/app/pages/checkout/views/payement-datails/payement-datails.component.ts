import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { OrdersService } from 'src/core/services/orders.service';

@Component({
  selector: 'app-payement-datails',
  templateUrl: './payement-datails.component.html',
  styleUrls: ['./payement-datails.component.css'],
})
export class PayementDatailsComponent implements OnInit, OnChanges {
  @Input() cartItems: any = [];
  latestCartItems: any[] = [];
  selectedCardID = 0;

  constructor(private ordersService: OrdersService) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cartItems']) {
      this.latestCartItems = changes['cartItems'].currentValue;
    }
  }

  ngOnInit() {}
  createOrder(cartItems: any): void {
    let order = cartItems.map((item) => {
      return {
        // currently on the backend we are using the current user id for placeing an order
        // so we don't really need to pass userId like the line below and we can remove it
        userId: item.userId,
        productIds: item.productId,
        quantity: item.quantity,
        // TODO: make sure that the backend is setuped for this else remove it
        price: item.product.price,
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
