import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  address$ = new BehaviorSubject<any>(null);
  constructor(private apiService: ApiService) {}

  get(): Observable<any> {
    return this.apiService.get('/api/address/user-address').pipe(
      tap((addresses) => {
        this.address$.value.push(addresses[length - 1]);
      })
    );
  }
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
