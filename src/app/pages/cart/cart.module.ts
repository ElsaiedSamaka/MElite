import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CartRoutingModule } from './cart-routing.module';
import { IndexComponent } from './components/index/index.component';

@NgModule({
  imports: [CartRoutingModule, CommonModule, SharedModule],
  declarations: [IndexComponent],
})
export class CartModule {}
