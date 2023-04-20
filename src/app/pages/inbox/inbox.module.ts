import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { InboxRoutingModule } from './inbox-routing.module';

@NgModule({
  imports: [CommonModule, InboxRoutingModule],
  declarations: [HomeComponent],
})
export class InboxModule {}
