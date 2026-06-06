import { Component, computed, inject, input } from '@angular/core';
import { ProductModel } from '../../models/product';
import { ViewPanel } from '../../directives/view-panel';
import { RatingSummary } from '../rating-summary/rating-summary';
import { ViewReviewItem } from '../view-review-item/view-review-item';
import { EcommerceStore } from '../../ecommerce-store';
import { WriteReview } from '../write-review/write-review';
import { SharedModule } from '../../modules/shared';

@Component({
  selector: 'app-view-reviews',
  imports: [ViewPanel, RatingSummary, ViewReviewItem, WriteReview, SharedModule],
  templateUrl: './view-reviews.html',
  styleUrl: './view-reviews.scss',
})
export class ViewReviews {
  store = inject(EcommerceStore);

  product = input.required<ProductModel>();

  sortedReviews = computed(() => {
    const reviews = this.product()?.reviews;
    if (!reviews?.length) return [];
    return [...reviews].sort((a, b) => {
      const dateA = a.reviewDate instanceof Date ? a.reviewDate : new Date(a.reviewDate);
      const dateB = b.reviewDate instanceof Date ? b.reviewDate : new Date(b.reviewDate);
      return dateB.getTime() - dateA.getTime();
    });
  });
}
