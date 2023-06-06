import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGaurd } from 'src/core/guards/AdminGaurd.guard';
import { AuthGuard } from 'src/core/guards/AuthGaurd.guard';

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
    canLoad: [AuthGuard],
    canActivate: [AdminGaurd],
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'profile',
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./pages/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'settings',
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./pages/settings/settings.module').then((m) => m.SettingsModule),
  },
  {
    path: 'checkout',
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./pages/checkout/cart.module').then((m) => m.CheckoutModule),
  },
  {
    path: 'noperm',
    loadChildren: () =>
      import('./pages/noperm/noperm.module').then((m) => m.NopermModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
