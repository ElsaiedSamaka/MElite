import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { InputComponent } from './input/input.component';
import { ModalComponent } from './modal/modal.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SortIconComponent } from './sort-icon/sort-icon.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [
    BreadcrumbComponent,
    InputComponent,
    ModalComponent,
    ConfirmModalComponent,
    SortIconComponent,
    NavBarComponent,
  ],
  exports: [
    BreadcrumbComponent,
    InputComponent,
    ModalComponent,
    ConfirmModalComponent,
    SortIconComponent,
    NavBarComponent,
  ],
})
export class SharedModule {}
