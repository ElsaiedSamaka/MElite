import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InboxRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';

@NgModule({
  imports: [CommonModule, InboxRoutingModule],
  declarations: [IndexComponent],
})
export class IndexModule {}
