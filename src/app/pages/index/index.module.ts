import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { TestComponent } from './components/test/test.component';
import { InboxRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';

@NgModule({
  imports: [CommonModule, InboxRoutingModule],
  declarations: [IndexComponent, HomeComponent, TestComponent],
})
export class IndexModule {}
