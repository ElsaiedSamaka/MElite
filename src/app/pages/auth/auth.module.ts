import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, AuthRoutingModule],
  declarations: [AuthComponent],
})
export class AuthModule {}
