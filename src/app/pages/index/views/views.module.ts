import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductReviewsComponent } from './product-reviews/product-reviews.component';

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule],
  declarations: [ProductCardComponent, ProductReviewsComponent],
  exports: [ProductCardComponent, ProductReviewsComponent],
})
export class IndexViewsModule {}
