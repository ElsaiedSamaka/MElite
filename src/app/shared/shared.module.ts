import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { InputComponent } from './input/input.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [BreadcrumbComponent, InputComponent, ModalComponent],
  exports: [BreadcrumbComponent, InputComponent, ModalComponent],
})
export class SharedModule {}
