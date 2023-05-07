import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  roles$ = new BehaviorSubject<any[]>([]);

  constructor(private apiService: ApiService) {}
  getCategories(): Observable<any[]> {
    return this.apiService.get('/api/roles').pipe(
      tap((res) => {
        this.roles$.next(res);
      })
    );
  }
  post(role: any): Observable<any> {
    return this.apiService.post('/api/roles', role);
  }
  getById(id: string): Observable<any> {
    return this.apiService.get(`/api/roles/${id}`);
  }
  deleteById(id: string): Observable<any> {
    return this.apiService.delete(`/api/roles/${id}`);
  }
  put(id: string, role: any): Observable<any> {
    return this.apiService.put(`/api/roles/${id}`, role);
  }
  assign(id: string, role: any): Observable<any> {
    return this.apiService.patch(`/api/roles/${id}`, role);
  }
}
