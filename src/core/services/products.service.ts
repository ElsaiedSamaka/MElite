import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
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
        }),
        catchError((err) => {
          // handle error and return a more specific error message
          const errorMessage = err?.error?.message ?? 'An error occurred.';
          return throwError(errorMessage);
        })
      );
  }
  getAll(): Observable<any[]> {
    return this.apiService.get('/api/products/get-all').pipe(
      tap((res) => {
        this.products$.next(res);
      }),
      catchError((err) => {
        // handle error and return a more specific error message
        const errorMessage = err?.error?.message ?? 'An error occurred.';
        return throwError(errorMessage);
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
      }),
      catchError((err) => {
        // handle error and return a more specific error message
        const errorMessage = err?.error?.message ?? 'An error occurred.';
        return throwError(errorMessage);
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
      }),
      catchError((err) => {
        // handle error and return a more specific error message
        const errorMessage = err?.error?.message ?? 'An error occurred.';
        return throwError(errorMessage);
      })
    );
  }
  put(id: string, product: any): Observable<any> {
    return this.apiService.put(`/api/products/${id}`, product).pipe(
      catchError((err) => {
        // handle error and return a more specific error message
        const errorMessage = err?.error?.message ?? 'An error occurred.';
        return throwError(errorMessage);
      })
    );
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
