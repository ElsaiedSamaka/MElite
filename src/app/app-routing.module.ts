import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'inbox',
    loadChildren: () =>
      import('./pages/inbox/inbox.module').then((m) => m.InboxModule),
  },
  {
    path: 'index',
    // canLoad:[],
    loadChildren: () =>
      import('./pages/index/index.module').then((m) => m.IndexModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
