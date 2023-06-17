import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReviewsService } from 'src/core/services/reviews.service';

@Component({
  selector: 'app-product-comments',
  templateUrl: './product-comments.component.html',
  styleUrls: ['./product-comments.component.css'],
})
export class ProductCommentsComponent implements OnInit {
  reviews: any[] = [];
  @Input() productId: string = '';
  showCommentActions: boolean = false;
  reviewId;
  submitOrUpdate: string = 'submit';
  showWarnToast: boolean = false;
  toastWarnMessage: string = '';
  showSuccessToast: boolean = false;
  toastSuccessMessage: string = '';
  showErrToast: boolean = false;
  toastErrMessage: string = '';
  constructor(private reviewsService: ReviewsService) {}

  ngOnInit() {
    this.getReviews();
  }
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
    if (this.submitOrUpdate == 'submit') {
      this.postReview(review);
    } else if (this.submitOrUpdate == 'update') {
      this.updateReview();
    }
  }
  getReviews(): void {
    this.reviewsService.get(this.productId).subscribe({
      next: (reviews) => {
        this.reviews = this.reviewsService.reviews$.value;
        this.reviews.sort((a, b) => b.id - a.id);
      },
    });
  }
  postReview(review: any): void {
    this.reviewsService.post(review).subscribe({
      next: (review) => {
        this.reviews = this.reviewsService.reviews$.value;
        this.reviews.sort((a, b) => b.id - a.id);
        this.toastSuccessMessage = 'تمت اضافة مراجعة بنجاح';
        this.toggleSuccessToast();
      },
      error: (err) => {
        this.toastErrMessage = err.message || 'خطأ غير متوقع';
        this.toggleErrToast();
        console.log('error', err);
      },
      complete: () => {
        this.reviewForm.controls.review.reset();
      },
    });
  }
  editReview(id: string, review: any): void {
    this.submitOrUpdate = 'update';
    this.reviewId = id;
    this.reviewForm.patchValue({
      rating: review.rating,
      review: review.review,
    });
    this.toggleCommentActions(id);
  }
  updateReview(): void {
    let updatedReview = {
      rating: this.reviewForm.controls.rating.value,
      review: this.reviewForm.controls.review.value,
    };
    this.reviewsService.put(this.reviewId, updatedReview).subscribe({
      next: (res) => {
        this.reviews = this.reviewsService.reviews$.value;
        this.reviews.sort((a, b) => b.id - a.id);
      },
      error: (err) => {
        this.toastErrMessage = err.message || 'خطأ غير متوقع';
        this.toggleErrToast();
        console.log('error', err);
      },
      complete: () => {
        this.submitOrUpdate = 'submit';
      },
    });
  }
  deleteReview(id: string): void {
    // this.reviewsService.deleteById(id)
  }
  createRange(number: number) {
    return Array.from({ length: number }, (_, i) => i);
  }
  toggleCommentActions(id: string): void {
    this.reviewId = id;
    this.showCommentActions = !this.showCommentActions;
  }
  toggleWarnToast(): void {
    this.showWarnToast = !this.showWarnToast;
    setTimeout(() => {
      this.showWarnToast = false;
    }, 3000);
  }
  toggleErrToast(): void {
    this.showErrToast = !this.showErrToast;
    setTimeout(() => {
      this.showErrToast = false;
    }, 3000);
  }
  toggleSuccessToast(): void {
    this.showSuccessToast = !this.showSuccessToast;
    setTimeout(() => {
      this.showSuccessToast = false;
    }, 3000);
  }
}
