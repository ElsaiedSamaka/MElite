import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AddressCartComponent } from './address-cart/address-cart.component';
import { PayementDatailsComponent } from './payement-datails/payement-datails.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PayementDatailsComponent, AddressCartComponent],
  exports: [PayementDatailsComponent, AddressCartComponent],
})
export class ViewsModule {}
