import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddressCartComponent } from './address-cart/address-cart.component';
import { PayementDatailsComponent } from './payement-datails/payement-datails.component';

@NgModule({
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  declarations: [PayementDatailsComponent, AddressCartComponent],
  exports: [PayementDatailsComponent, AddressCartComponent],
})
export class ViewsModule {}
