import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TreatmentResolverService } from 'src/core/resolvers/treatment-resolver.service';
import { DetailedComponent } from './components/detailed/detailed.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PlaceholderComponent } from './components/placeholder/placeholder.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'not-found', component: NotFoundComponent },
      {
        path: ':id',
        component: DetailedComponent,
        resolve: { treatment: TreatmentResolverService },
      },
      { path: '', component: PlaceholderComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxRoutingModule { }
