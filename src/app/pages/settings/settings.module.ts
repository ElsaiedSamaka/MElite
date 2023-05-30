import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
  imports: [SettingsRoutingModule, CommonModule, RouterModule, SharedModule],
  declarations: [HomeComponent],
})
export class SettingsModule {}
