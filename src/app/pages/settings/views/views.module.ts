import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserFormComponent } from './user-form/user-form.component';

@NgModule({
  imports: [CommonModule],
  declarations: [UserFormComponent],
  exports: [UserFormComponent],
})
export class ViewsModule {}
