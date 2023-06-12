import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products$ = new BehaviorSubject<any[]>([]);
  constructor(private apiService: ApiService) {}
  getProducts(
    page?: number,
    size?: number,
    available?: any
  ): Observable<any[]> {
    return this.apiService
      .get(`/api/products?page=${page}&size=${size}&available=${available}`)
      .pipe(
        tap((res) => {
          this.products$.next(res.products);
        })
      );
  }
  getAll(): Observable<any[]> {
    return this.apiService.get('/api/products/get-all').pipe(
      tap((res) => {
        this.products$.next(res);
      })
    );
  }
  getById(id: string): Observable<any> {
    return this.apiService.get(`/api/products/${id}`);
  }
  getByCategory(id: string): Observable<any[]> {
    return this.apiService.get(`/api/products/by-category/${id}`).pipe(
      tap((res) => {
        this.products$.next(res);
      })
    );
  }
  deleteById(id: string): Observable<any> {
    return this.apiService.delete(`/api/products/${id}`);
  }
  post(product: any): Observable<any> {
    return this.apiService.post('/api/products', product).pipe(
      tap((newProduct) => {
        this.products$.value.push(newProduct);
      })
    );
  }
  put(id: string, product: any): Observable<any> {
    return this.apiService.put(`/api/products/${id}`, product);
  }
  filter(filter: string): Observable<any[]> {
    // TODO: make sure the backend is ready for this
    return this.apiService.get(`/api/products?filter=${filter}`).pipe(
      tap((res) => {
        this.products$.next(res.products);
      })
    );
  }
  search(term: any): Observable<any[]> {
    // TODO: make sure the backend is ready for this
    return this.apiService.get(`/api/products?name=${term}`).pipe(
      tap((res) => {
        console.log(res);
        this.products$.next(res.products);
      })
    );
  }
}
