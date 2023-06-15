import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class EndDateRange implements Validator {
  validate(control: AbstractControl<any, any>): ValidationErrors {
    const startDate = control.get('startDate').value;
    const endDate = control.get('endDate').value;
    if (
      startDate !== null &&
      endDate !== null &&
      new Date(endDate) < new Date(startDate)
    ) {
      return { endDateRange: true };
    }
    return null;
  }
}
