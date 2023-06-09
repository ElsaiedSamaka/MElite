import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/core/services/cart.service';
import { FavService } from 'src/core/services/fav.service';
import { OrdersService } from 'src/core/services/orders.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  tabs = [
    { id: 1, label: 'منتجات بالمفضلة' },
    { id: 2, label: 'السلة' },
  ];
  selectedTabId = 2;
  orders: any[] = [];
  totalPriceByOrder: any;
  cartItems: any[] = [];
  favProducts: any[] = [];
  constructor(
    private ordersService: OrdersService,
    private cartService: CartService,
    private favService: FavService
  ) {}

  ngOnInit() {
    this.getMyOrders();
    this.getTotalPriceByOrders();
    this.cartItems = this.cartService.items$.value;
  }
  getMyOrders(): void {
    this.ordersService.getOrdersOfCurrentUser().subscribe({
      next: (orders) => {
        this.orders = this.ordersService.orders$.value;
      },
      error: (err) => {
        console.log('error while retreiving user orders', err);
      },
      complete: () => {},
    });
  }

  getTotalPriceByOrders(): void {
    this.totalPriceByOrder = this.orders?.map((order) => {
      const totalPrice = order.products.reduce(
        (sum, product) => +sum + +product.price,
        0
      );
      return { orderId: order.id, totalPrice };
    });
  }
  cancelOrder(id: string): void {
    this.ordersService.cancel(id).subscribe({
      next: (updatedOrder) => {
        this.getMyOrders();
      },
      error: (err) => {
        console.log('error while caneling an order', err);
      },
      complete: () => {},
    });
  }
  selectTab(id: number) {
    this.selectedTabId = id;
  }
}
