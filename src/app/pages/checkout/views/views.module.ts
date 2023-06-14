import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddressCartComponent } from './address-cart/address-cart.component';
import { CheckoutCartComponent } from './checkout-cart/checkout-cart.component';
import { PayementCardComponent } from './payement-card/payement-card.component';
import { StepperComponent } from './stepper/stepper.component';

@NgModule({
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  declarations: [
    AddressCartComponent,
    PayementCardComponent,
    CheckoutCartComponent,
    StepperComponent,
  ],
  exports: [
    AddressCartComponent,
    PayementCardComponent,
    StepperComponent,
    CheckoutCartComponent,
  ],
})
export class ViewsModule {}
