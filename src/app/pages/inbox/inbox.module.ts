import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { InboxRoutingModule } from './inbox-routing.module';
import { InboxComponent } from './inbox.component';

@NgModule({
  imports: [CommonModule, InboxRoutingModule],
  declarations: [InboxComponent, HomeComponent],
})
export class InboxModule {}
