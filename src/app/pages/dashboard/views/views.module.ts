import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { InfoCardsComponent } from './info-cards/info-cards.component';
import { LatesUsersCardComponent } from './lates-users-card/lates-users-card.component';
import { LatestProductsCardComponent } from './latest-products-card/latest-products-card.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ProductsGridComponent } from './products-grid/products-grid.component';
@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    InfoCardsComponent,
    ProductsGridComponent,
    LatestProductsCardComponent,
    LatesUsersCardComponent,
    FooterComponent,
    PaginationComponent,
  ],
  exports: [
    InfoCardsComponent,
    ProductsGridComponent,
    LatestProductsCardComponent,
    LatesUsersCardComponent,
    FooterComponent,
    PaginationComponent,
  ],
})
export class ViewsModule {}
