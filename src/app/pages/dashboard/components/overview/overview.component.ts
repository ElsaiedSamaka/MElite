import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/core/services/orders.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
})
export class OverviewComponent implements OnInit {
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
}
