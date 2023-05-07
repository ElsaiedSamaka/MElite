import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/core/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  constructor(private ordersService: OrdersService) {}

  ngOnInit() {
    this.getOrders();
  }
  getOrders(): void {
    this.ordersService.getAll().subscribe({
      next: (res) => {
        this.orders = this.ordersService.orders$.value;
      },
      error: (err) => {
        console.log('err while returning orders', err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }
  cancelOrder(id: string): void {
    this.ordersService.cancel(id).subscribe({
      next: (res) => {
        // console.log('res', res);
      },
      error: (err) => {
        console.log('err', err);
      },
      complete: () => {
        this.getOrders();
        console.log('complete');
      },
    });
  }
}
