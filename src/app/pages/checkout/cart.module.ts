import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CheckoutRoutingModule } from './cart-routing.module';
import { IndexComponent } from './components/index/index.component';

@NgModule({
  imports: [CheckoutRoutingModule, CommonModule, SharedModule],
  declarations: [IndexComponent],
})
export class CheckoutModule {}
