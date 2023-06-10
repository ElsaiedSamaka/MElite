import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AddressCartComponent } from './address-cart/address-cart.component';
import { PayementDatailsComponent } from './payement-datails/payement-datails.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [PayementDatailsComponent, AddressCartComponent],
  exports: [PayementDatailsComponent, AddressCartComponent],
})
export class ViewsModule {}
