import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SortDirective } from './sort.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [SortDirective],
  exports: [SortDirective],
})
export class MyCommonModule {}
