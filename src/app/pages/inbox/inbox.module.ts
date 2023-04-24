import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { InboxRoutingModule } from './inbox-routing.module';
import { ViewsModule } from './views/views.module';

@NgModule({
  imports: [InboxRoutingModule, CommonModule, SharedModule, ViewsModule],
  declarations: [HomeComponent],
})
export class InboxModule {}
