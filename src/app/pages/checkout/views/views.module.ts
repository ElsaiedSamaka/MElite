import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AddressCartComponent } from './address-cart/address-cart.component';
import { PayementCardComponent } from './payement-card/payement-card.component';
import { PayementDatailsComponent } from './payement-datails/payement-datails.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [
    PayementDatailsComponent,
    AddressCartComponent,
    PayementCardComponent,
  ],
  exports: [
    PayementDatailsComponent,
    AddressCartComponent,
    PayementCardComponent,
  ],
})
export class ViewsModule {}
