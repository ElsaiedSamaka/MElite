import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  categories$ = new BehaviorSubject<any[]>([]);

  constructor(private apiService: ApiService) {}
  getCategories(): Observable<any[]> {
    return this.apiService.get('/api/categories').pipe(
      tap((res) => {
        this.categories$.next(res);
      })
    );
  }
  post(category: any): Observable<any> {
    return this.apiService.post('/api/categories', category);
  }
}
