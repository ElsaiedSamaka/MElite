import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class StartDateRange implements Validator {
  validate(control: AbstractControl<any, any>): ValidationErrors {
    const startDate = control.get('startDate').value;
    const endDate = control.get('endDate').value;
    if (
      startDate !== null &&
      endDate !== null &&
      new Date(startDate) > new Date(endDate)
    ) {
      return { startDateRange: true };
    }
    return null;
  }
}
