import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Treatment } from '../models/treatment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class TreatmentsService {
  constructor(private apiService: ApiService) {}
  getAll(): Observable<Treatment[]> {
    return this.apiService.get('/treatments');
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
}
