import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { InputComponent } from './input/input.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [BreadcrumbComponent, InputComponent],
  exports: [BreadcrumbComponent, InputComponent],
})
export class SharedModule {}
