import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FilterBarComponent } from './filter-bar/filter-bar.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

@NgModule({
  imports: [CommonModule],
  declarations: [FilterBarComponent, SearchBarComponent],
  exports: [FilterBarComponent, SearchBarComponent],
})
export class ViewsModule {}
