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
  showCommentActions: boolean = false;
  articleIndex;
  showWarnToast: boolean = false;
  toastWarnMessage: string = '';
  showErrToast: boolean = false;
  toastErrMessage: string = '';
  constructor(private reviewsService: ReviewsService) {}

  ngOnInit() {}
  reviewForm = new FormGroup({
    rating: new FormControl(),
    review: new FormControl(''),
  });
  onSubmit(): void {
    if (this.reviewForm.invalid) return;
    console.log('reviewForm', this.reviewForm.value);
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
        this.toastErrMessage = err.message || 'خطأ غير متوقع';
        this.toggleErrToast();
        console.log('error', err);
      },
      complete: () => {
        this.reviewForm.reset();
      },
    });
  }
  updatedReview(id: string, review: any): void {
    // this.reviewsService.put()
  }
  deleteReview(id: string): void {
    // this.reviewsService.deleteById(id)
  }
  toggleCommentActions(i: string): void {
    this.articleIndex = i;
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
}
