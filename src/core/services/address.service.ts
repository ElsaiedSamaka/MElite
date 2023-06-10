import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  address$ = new BehaviorSubject<any>(null);
  constructor(private apiService: ApiService) {}
  post(address: any): Observable<any> {
    return this.apiService.post('/api/address', address).pipe(
      tap((addedAddress) => {
        this.address$.value.next(addedAddress);
      })
    );
  }
  put(id: string, address: any): Observable<any> {
    return this.apiService.put(`/api/address/${id}`, address).pipe(
      tap((updatedCartItem) => {
        this.address$.value.next(updatedCartItem);
      })
    );
  }
}
