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
      tap((orders) => {
        this.orders$.next(orders);
      })
    );
  }
  getOrdersByUser(userId: string): Observable<any[]> {
    return this.apiService.get(`/api/orders/by-user/${userId}`).pipe(
      tap((orders) => {
        this.orders$.next(orders);
      })
    );
  }
  getOrdersOfCurrentUser(): Observable<any[]>{
    return this.apiService.get(`/api/orders/current-user`).pipe(
      tap((orders) => {
        this.orders$.next(orders);
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
  // TODO: not implemented on the backend need check
  // you can't update on order once been proceed
  put(id: string, product: any): Observable<any> {
    return this.apiService.put(`/api/orders/${id}`, product);
  }
  cancel(id: string): Observable<any> {
    return this.apiService.put(`/api/orders/${id}`);
  }
}
