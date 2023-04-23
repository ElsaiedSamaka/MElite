import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { InputComponent } from './input/input.component';
import { ModalComponent } from './modal/modal.component';
import { SortIconComponent } from './sort-icon/sort-icon.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [
    BreadcrumbComponent,
    InputComponent,
    ModalComponent,
    ConfirmModalComponent,
    SortIconComponent,
  ],
  exports: [
    BreadcrumbComponent,
    InputComponent,
    ModalComponent,
    ConfirmModalComponent,
    SortIconComponent,
  ],
})
export class SharedModule {}
