import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { TabBarComponent } from './tab-bar/tab-bar.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TabBarComponent, SearchBarComponent],
  exports: [TabBarComponent, SearchBarComponent],
})
export class ViewsModule {}
