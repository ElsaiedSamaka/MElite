import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private apiService: ApiService) {}

  getAllTasks(title: string, page: number): Observable<any[]> {
    return this.apiService.get(`/api/tasks?title=${title}&page=${page}`);
  }
  getCurrentUserTasks(): Observable<any[]> {
    return this.apiService.get(`/api/tasks/user-tasks`);
  }
  getTasksByUser(userId: string): Observable<any[]> {
    return this.apiService.get(`/api/tasks/${userId}/user-tasks`);
  }

  getTaskById(id: string): Observable<any> {
    return this.apiService.get(`/api/tasks/${id}`);
  }
  createTask(task: any): Observable<any> {
    return this.apiService.post(`/api/tasks`, task);
  }
  createTaskByCurrentUser(task: any): Observable<any> {
    return this.apiService.post(`/api/tasks/user-tasks`, task);
  }
  createTaskForSpecificUser(task: any): Observable<any> {
    return this.apiService.post(`/api/tasks/user-tasks/create`, task);
  }
  updateTask(id: string, task: any): Observable<any> {
    return this.apiService.put(`/api/tasks/${id}`, task);
  }
  deleteTask(id: string): Observable<any> {
    return this.apiService.delete(`/api/tasks/${id}`);
  }
}
