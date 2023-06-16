import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductCommentsComponent } from './product-comments/product-comments.component';
import { ProductReviewsComponent } from './product-reviews/product-reviews.component';

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule, ReactiveFormsModule],
  declarations: [
    ProductCardComponent,
    ProductReviewsComponent,
    ProductCommentsComponent,
  ],
  exports: [
    ProductCardComponent,
    ProductReviewsComponent,
    ProductCommentsComponent,
  ],
})
export class IndexViewsModule {}
