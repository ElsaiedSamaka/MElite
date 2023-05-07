import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [CommonModule, SharedModule, DashboardRoutingModule],
  declarations: [],
})
export class DashboardModule {}
