import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FilterBarComponent } from './filter-bar/filter-bar.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { TabBarComponent } from './tab-bar/tab-bar.component';

@NgModule({
  imports: [CommonModule],
  declarations: [FilterBarComponent, SearchBarComponent, TabBarComponent],
  exports: [FilterBarComponent, SearchBarComponent, TabBarComponent],
})
export class ViewsModule {}
