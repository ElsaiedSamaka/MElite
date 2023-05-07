import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MyCommonModule } from 'src/utils/directives/my-common.module';
import { IndexComponent } from './components/index/index.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OverviewComponent } from './components/overview/overview.component';
import { ProductsComponent } from './components/products/products.component';
import { UsersComponent } from './components/users/users.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ViewsModule } from './views/views.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ViewsModule,
    SharedModule,
    DashboardRoutingModule,
    MyCommonModule,
  ],
  declarations: [
    IndexComponent,
    OverviewComponent,
    UsersComponent,
    ProductsComponent,
    OrdersComponent,
  ],
})
export class DashboardModule {}
