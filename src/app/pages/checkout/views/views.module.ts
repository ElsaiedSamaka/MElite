import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PayementDatailsComponent } from './payement-datails/payement-datails.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PayementDatailsComponent],
  exports: [PayementDatailsComponent],
})
export class ViewsModule {}
