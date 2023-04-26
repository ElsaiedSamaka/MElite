import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { InboxRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';

@NgModule({
  imports: [CommonModule, SharedModule, InboxRoutingModule],
  declarations: [IndexComponent, HomeComponent],
})
export class IndexModule {}
