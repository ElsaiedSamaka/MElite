import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { EMPTY, catchError } from 'rxjs';
import { Treatment } from '../models/treatment';
import { TreatmentsService } from '../services/treatments.service';

@Injectable({
  providedIn: 'root',
})
export class TreatmentResolverService implements Resolve<Treatment> {
  constructor(
    private treatmentsService: TreatmentsService,
    private router: Router
  ) {}
  resolve(route: ActivatedRouteSnapshot) {
    const { id } = route.params;
    return this.treatmentsService.getById(id).pipe(
      catchError((err) => {
        console.log(err);
        this.router.navigateByUrl('/inbox/not-found');
        return EMPTY;
      })
    );
  }
}
