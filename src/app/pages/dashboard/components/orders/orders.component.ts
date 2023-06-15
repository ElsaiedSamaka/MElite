import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrdersService } from 'src/core/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  orderForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private ordersService: OrdersService
  ) {}

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      startDate: [''],
      endDate: [''],
    });
  }

  getOrders(): void {
    const startDate = this.orderForm.get('startDate').value;
    const endDate = this.orderForm.get('endDate').value;
    this.ordersService.getOrdersByDate(startDate, endDate).subscribe({
      next: (orders) => {
        this.orders = orders;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {},
    });
  }
}
