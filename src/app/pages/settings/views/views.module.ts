import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserFormComponent } from './user-form/user-form.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, SharedModule],
  declarations: [UserFormComponent],
  exports: [UserFormComponent],
})
export class ViewsModule {}
