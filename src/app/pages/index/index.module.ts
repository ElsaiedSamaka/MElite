import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewsModule } from '../dashboard/views/views.module';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { InboxRoutingModule } from './index-routing.module';

@NgModule({
  imports: [CommonModule, ViewsModule, SharedModule, InboxRoutingModule],
  declarations: [HomeComponent, AllProductsComponent, ProductDetailsComponent],
})
export class IndexModule {}
