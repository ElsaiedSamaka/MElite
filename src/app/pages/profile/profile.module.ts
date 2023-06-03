import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ViewsModule } from './views/views.module';

@NgModule({
  imports: [
    ProfileRoutingModule,
    ViewsModule,
    CommonModule,
    RouterModule,
    SharedModule,
  ],
  declarations: [HomeComponent],
})
export class ProfileModule {}
