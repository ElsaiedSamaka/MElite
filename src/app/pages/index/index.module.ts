import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewsModule } from '../dashboard/views/views.module';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { IndexRoutingModule } from './index-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ViewsModule,
    SharedModule,
    RouterModule,
    IndexRoutingModule,
  ],
  declarations: [
    HomeComponent,
    AllProductsComponent,
    ProductDetailsComponent,
    NotFoundComponent,
  ],
})
export class IndexModule {}
