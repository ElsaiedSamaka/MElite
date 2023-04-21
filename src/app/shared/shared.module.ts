import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

@NgModule({
  imports: [CommonModule],
  declarations: [BreadcrumbComponent],
  exports: [BreadcrumbComponent],
})
export class SharedModule {}
