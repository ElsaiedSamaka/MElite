import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { SignoutComponent } from './components/signout/signout.component';

const routes: Routes = [
  { path: 'signout', component: SignoutComponent },
  { path: '', component: SigninComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
