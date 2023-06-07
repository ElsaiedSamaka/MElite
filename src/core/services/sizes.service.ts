import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class SizesService {
  sizes$ = new BehaviorSubject<any[]>([]);

  constructor(private apiService: ApiService) {}
  getAll(): Observable<any[]> {
    return this.apiService.get('/api/sizes').pipe(
      tap((sizes) => {
        this.sizes$.next(sizes);
      })
    );
  }
}
