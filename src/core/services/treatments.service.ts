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
    return this.apiService.get('/api/treatments').pipe(
      tap((res) => {
        this.treatments$.next(res.treatments);
      })
    );
  }
  getById(id: string): Observable<Treatment> {
    return this.apiService.get(`/api/treatments/${id}`);
  }
  deleteById(id: string): Observable<any> {
    return this.apiService.delete(`/api/treatments/${id}`);
  }
  post(treatment: Treatment): Observable<Treatment> {
    return this.apiService.post('/api/treatments', treatment);
  }
  put(id: string, treatment: Treatment): Observable<Treatment> {
    return this.apiService.put(`/api/treatments/${id}`, treatment);
  }
  filter(filter: string): Observable<Treatment[]> {
    // TODO: make sure the backend is ready for this
    return this.apiService.get(`/api/treatments?filter=${filter}`).pipe(
      tap((res) => {
        this.treatments$.next(res.treatments);
      })
    );
  }
  search(term: any): Observable<Treatment[]> {
    // TODO: make sure the backend is ready for this
    return this.apiService.get(`/api/treatments?subject=${term}`).pipe(
      tap((res) => {
        this.treatments$.next(res.treatments);
      })
    );
  }
}
