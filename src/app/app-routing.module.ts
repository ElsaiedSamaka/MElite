import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    // canLoad:[],
    loadChildren:() => import('./pages/index/index.module').then((m)=>m.IndexModule)
  },
  {
    path: 'inbox',
    // canLoad:[AuthGaurd],
    loadChildren:() => import('./pages/inbox/inbox.module').then((m)=>m.InboxModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
