import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class FavService {
  favProducts$ = new BehaviorSubject<any[]>([]);

  constructor(private apiService: ApiService) {}
  getFavProducts(): Observable<any[]> {
    return this.apiService.get('/api/fav-products').pipe(
      tap((favProducts) => {
        this.favProducts$.next(favProducts);
      })
    );
  }
  post(favProduct: any): Observable<any> {
    return this.apiService.post('/api/fav-products', favProduct).pipe(
      tap((favProduct) => {
        this.favProducts$.value.push(favProduct);
      })
    );
  }
  deleteById(id: string): Observable<any> {
    return this.apiService.delete(`/api/fav-products/${id}`).pipe(
      tap((deletedFavProduct) => {
        let updatedFavProducts = this.favProducts$.value.filter(
          (favProduct) => favProduct.id !== deletedFavProduct.id
        );
        this.favProducts$.next(updatedFavProducts);
      })
    );
  }
}
