import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrdersService } from 'src/core/services/orders.service';
import { EndDateRange } from 'src/core/validators/end-date-range';
import { StartDateRange } from 'src/core/validators/start-date-range';

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
    private ordersService: OrdersService,
    private startDateRange: StartDateRange,
    private endDateRange: EndDateRange
  ) {}

  ngOnInit() {
    this.orderForm = this.formBuilder.group(
      {
        startDate: [''],
        endDate: [''],
      },
      { validators: [this.startDateRange.validate, this.endDateRange.validate] }
    );
  }
  showErrors() {
    const { dirty, touched, errors } = this.orderForm;
    return dirty && touched && errors;
  }
  getOrders(): void {
    const startDate = this.orderForm.get('startDate').value;
    const endDate = this.orderForm.get('endDate').value;
    if (startDate == '' && endDate == '') return;
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
