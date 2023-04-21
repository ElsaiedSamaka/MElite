import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Treatment } from '../models/treatment';
import { TreatmentsService } from '../services/treatments.service';

@Injectable({
  providedIn: 'root',
})
export class TreatmentResolverService implements Resolve<Treatment> {
  constructor(private treatmentsService: TreatmentsService) {}
  resolve(route: ActivatedRouteSnapshot) {
    const { id } = route.params;
    return this.treatmentsService.getById(id);
  }
}
