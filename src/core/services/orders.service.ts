import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  orders$ = new BehaviorSubject<any[]>([]);

  constructor(private apiService: ApiService) {}
  getAll(): Observable<any[]> {
    return this.apiService.get('/api/orders').pipe(
      tap((res) => {
        this.orders$.next(res);
      })
    );
  }
  getById(id: string): Observable<any> {
    return this.apiService.get(`/api/orders/${id}`);
  }
  deleteById(id: string): Observable<any> {
    return this.apiService.delete(`/api/orders/${id}`);
  }
  post(product: any): Observable<any> {
    return this.apiService.post('/api/orders', product);
  }
  put(id: string, product: any): Observable<any> {
    return this.apiService.put(`/api/orders/${id}`, product);
  }
  cancel(id: string): Observable<any> {
    return this.apiService.put(`/api/orders/${id}`);
  }
}
