import { Component, inject, signal } from '@angular/core';
import { ViewPanel } from '../../directives/view-panel';
import {
  FormBuilder,
  Validators,
} from '@angular/forms';
import { EcommerceStore } from '../../ecommerce-store';
import { OptionItemModel } from '../../models/option-item';
import { AddReviewParams } from '../../models/user-review';
import { SharedModule } from '../../modules/shared';

@Component({
  selector: 'app-write-review',
  imports: [
    ViewPanel,
    SharedModule
  ],
  templateUrl: './write-review.html',
  styleUrl: './write-review.scss',
  host: {
    class: 'block',
  },
})
export class WriteReview {
  store = inject(EcommerceStore);
  fb = inject(FormBuilder);

  ratingOptions = signal<OptionItemModel[]>([
    { value: 5, label: '5 Stars - Excellent' },
    { value: 4, label: '4 Stars - Very Good' },
    { value: 3, label: '3 Stars - Good' },
    { value: 2, label: '2 Stars - Fair' },
    { value: 1, label: '1 Stars - Poor' },
  ]);

  reviewForm = this.fb.group({
  title: ['Great Product', [Validators.required, Validators.maxLength(120)]],
    rating: [5, [Validators.required]],
    comment: ['This is a great product!', [Validators.required, Validators.minLength(10)]],
  });

  saveReview(): void {
    if (this.reviewForm.invalid) {
      this.reviewForm.markAllAsTouched();
      return;
    }

    const {title, rating, comment} = this.reviewForm.value;
    this.store.addReview({title, rating, comment} as AddReviewParams);

  }
}
