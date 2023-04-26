import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { InboxRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';

@NgModule({
  imports: [CommonModule, SharedModule, InboxRoutingModule],
  declarations: [IndexComponent],
})
export class IndexModule {}
