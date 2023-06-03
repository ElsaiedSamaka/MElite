import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FavProductsComponent } from './fav-products/fav-products.component';

@NgModule({
  imports: [CommonModule],
  declarations: [FavProductsComponent],
  exports: [FavProductsComponent],
})
export class ViewsModule {}
