import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users$ = new BehaviorSubject<any[]>([]);
  constructor(private apiService: ApiService) {}
  getUsers(): Observable<any[]> {
    return this.apiService.get(`/api/users`).pipe(
      tap((res) => {
        this.users$.next(res);
      })
    );
  }
  getById(id: string): Observable<any> {
    return this.apiService.get(`/api/users/${id}`);
  }
  getByRole(id: string): Observable<any[]> {
    return this.apiService.get(`/api/users/by-role/${id}`).pipe(
      tap((res) => {
        this.users$.next(res);
      })
    );
  }
  deleteById(id: string): Observable<any> {
    return this.apiService.delete(`/api/users/${id}`);
  }
  put(id: string, user: any): Observable<any> {
    return this.apiService.put(`/api/users/${id}`, user);
  }
  patch(id: string): Observable<any> {
    return this.apiService.patch(`/api/users/${id}`);
  }
  search(email?: string): Observable<any[]> {
    return this.apiService.get(`/api/users?email=${email}`).pipe(
      tap((res) => {
        this.users$.next(res);
      })
    );
  }
}
