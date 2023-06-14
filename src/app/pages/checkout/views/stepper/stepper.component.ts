import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/core/services/cart.service';
import { OrdersService } from 'src/core/services/orders.service';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
})
export class StepperComponent implements OnInit {
  currentStepIndex = 1;
  steps = [
    { id: 1, label: 'بيانات الدفع', description: 'This is step 1' },
    { id: 2, label: 'عنوان الشحن', description: 'This is step 2' },
    { id: 3, label: 'مراجعة الطلب', description: 'This is step 3' },
  ];
  cartItems: any[] = [];
  isAddressSubmitted: boolean = false;

  constructor(
    private ordersService: OrdersService,
    private cartService: CartService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.dataService.isAddressSubmitted$.subscribe((value) => {
      this.isAddressSubmitted = value;
    });
  }
  createOrder() {
    this.cartItems = this.cartService.items$.value;
    this.ordersService.post(this.cartItems).subscribe({
      next: (res) => {
        console.log('res [create Order]', res);
      },
      error: (err) => {
        console.log('err while creating an order', err);
      },
      complete: () => {},
    });
  }
  nextStep() {
    this.currentStepIndex++;
    console.log(this.currentStepIndex);
  }

  prevStep() {
    this.currentStepIndex--;
    console.log(this.currentStepIndex);
  }
}
