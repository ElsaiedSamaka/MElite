import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CheckoutRoutingModule } from './cart-routing.module';
import { IndexComponent } from './components/index/index.component';
import { ViewsModule } from './views/views.module';

@NgModule({
  imports: [CheckoutRoutingModule, CommonModule, ViewsModule, SharedModule],
  declarations: [IndexComponent],
})
export class CheckoutModule {}
