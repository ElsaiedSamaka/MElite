import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ColorsService {
  colors$ = new BehaviorSubject<any[]>([]);
  constructor(private apiService: ApiService) {}
  getAll(): Observable<any[]> {
    return this.apiService.get('/api/colors').pipe(
      tap((colors) => {
        this.colors$.next(colors);
      })
    );
  }
}
