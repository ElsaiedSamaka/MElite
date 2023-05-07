import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductResolverService } from 'src/core/resolvers/product-resolver.service';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'all-products',
    component: AllProductsComponent,
  },
  {
    path: ':id',
    component: ProductDetailsComponent,
    resolve: { product: ProductResolverService },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InboxRoutingModule {}
