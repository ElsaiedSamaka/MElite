import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReviewsService } from 'src/core/services/reviews.service';

@Component({
  selector: 'app-product-comments',
  templateUrl: './product-comments.component.html',
  styleUrls: ['./product-comments.component.css'],
})
export class ProductCommentsComponent implements OnInit {
  @Input() reviews: any[] = [];
  @Input() productId: string = '';
  constructor(private reviewsService: ReviewsService) {}

  ngOnInit() {}
  reviewForm = new FormGroup({
    rating: new FormControl(),
    review: new FormControl(''),
  });
  onSubmit(): void {
    if (this.reviewForm.invalid) return;
    let review = {
      productId: this.productId,
      rating: this.reviewForm.controls.rating.value,
      review: this.reviewForm.controls.review.value,
    };
    this.postReview(review);
  }
  postReview(review: any): void {
    this.reviewsService.post(review).subscribe({
      next: (review) => {
        this.reviews = this.reviewsService.reviews$.value;
      },
      error: (err) => {
        console.log('error', err);
      },
      complete: () => {},
    });
  }
  updatedReview(id: string, review: any): void {
    // this.reviewsService.put()
  }
  deleteReview(id: string): void {
    // this.reviewsService.deleteById(id)
  }
}
