import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Treatment } from '../models/treatment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class TreatmentsService {
  treatments$ = new BehaviorSubject<Treatment[]>([]);
  constructor(private apiService: ApiService) {}
  getAll(): Observable<Treatment[]> {
    return this.apiService.get('/treatments').pipe(
      tap((treatments) => {
        this.treatments$.next(treatments);
      })
    );
  }
  getById(id: string): Observable<Treatment> {
    return this.apiService.get(`/treatments/${id}`);
  }
  deleteById(id: string): Observable<any> {
    return this.apiService.delete(`/treatments/${id}`);
  }
  post(treatment: Treatment): Observable<Treatment> {
    return this.apiService.post('/treatments', treatment);
  }
  put(id: string, treatment: Treatment): Observable<Treatment> {
    return this.apiService.put(`/treatments/${id}`, treatment);
  }
  filter(filter: string): Observable<Treatment[]> {
    // TODO: make sure the backend is ready for this
    return this.apiService.get(`/treatments?filter=${filter}`).pipe(
      tap((treatments) => {
        this.treatments$.next(treatments);
      })
    );
  }
}
