import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  isAddressSubmitted$ = new BehaviorSubject<boolean>(true);
  constructor() {}
}
