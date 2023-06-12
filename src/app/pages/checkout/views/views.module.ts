import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AddressCartComponent } from './address-cart/address-cart.component';
import { PayementCardComponent } from './payement-card/payement-card.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [AddressCartComponent, PayementCardComponent],
  exports: [AddressCartComponent, PayementCardComponent],
})
export class ViewsModule {}
