import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  reviews$ = new BehaviorSubject<any[]>([]);

  constructor(private apiService: ApiService) {}
  get(id: string): Observable<any[]> {
    return this.apiService.get(`/api/reviews/${id}`).pipe(
      tap((reviews) => {
        this.reviews$.next(reviews);
      })
    );
  }
  deleteById(id: string): Observable<any> {
    return this.apiService.delete(`/api/reviews/${id}`).pipe(
      tap((deletedReview) => {
        let updatedReviews = this.reviews$.value.filter(
          (review) => review.id !== deletedReview.id
        );
        this.reviews$.next(updatedReviews);
      })
    );
  }
  post(review: any): Observable<any> {
    return this.apiService.post('/api/reviews', review).pipe(
      tap((addedReview) => {
        this.reviews$.value.push(addedReview);
      })
    );
  }
  put(id: string, review: any): Observable<any> {
    return this.apiService.put(`/api/reviews/${id}`, review).pipe(
      tap((updatedReview) => {
        const index = this.reviews$.value.findIndex((r) => r.id === id);
        this.reviews$.value.splice(index, 1, updatedReview);
      })
    );
  }
}
