import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  imports: [SettingsRoutingModule, CommonModule, SharedModule],
  declarations: [HomeComponent],
})
export class SettingsModule {}
