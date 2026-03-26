import { Component, computed, inject, input } from '@angular/core';
import { ProductModel } from '../../models/product';
import { ViewPanel } from '../../directives/view-panel';
import { RatingSummary } from '../rating-summary/rating-summary';
import { ViewReviewItem } from '../view-review-item/view-review-item';
import { EcommerceStore } from '../../ecommerce-store';
import { WriteReview } from '../write-review/write-review';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-view-reviews',
  imports: [MatButton, ViewPanel, RatingSummary, ViewReviewItem, WriteReview],
  templateUrl: './view-reviews.html',
  styleUrl: './view-reviews.scss',
})
export class ViewReviews {
  store = inject(EcommerceStore);

  product = input.required<ProductModel>();

  sortedReviews = computed(() => {
    return [...this.product().reviews].sort((a, b) => b.reviewDate.getTime() - a.reviewDate.getTime());
  })
}
