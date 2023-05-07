import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'inbox',
    // canLoad: [AuthGuard],
    loadChildren: () =>
      import('./pages/inbox/inbox.module').then((m) => m.InboxModule),
  },
  {
    path: 'index',
    // canLoad: [AuthGuard],
    loadChildren: () =>
      import('./pages/index/index.module').then((m) => m.IndexModule),
  },
  {
    path: 'dashboard',
    // canLoad: [AuthGuard],
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'profile',
    // canLoad: [AuthGuard],
    loadChildren: () =>
      import('./pages/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'settings',
    // canLoad: [AuthGuard],
    loadChildren: () =>
      import('./pages/settings/settings.module').then((m) => m.SettingsModule),
  },
  {
    path: 'cart',
    // canLoad: [AuthGuard],
    loadChildren: () =>
      import('./pages/cart/cart.module').then((m) => m.CartModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
