import { Component, inject, input } from '@angular/core';
import { UserReviewModel } from '../../models/user-review';
import { ViewPanel } from '../../directives/view-panel';
import { StarRating } from "../../components/star-rating/star-rating";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-review-item',
  imports: [ViewPanel, CommonModule, StarRating],
  templateUrl: './view-review-item.html',
  styleUrl: './view-review-item.scss',
})
export class ViewReviewItem {
  review = input.required<UserReviewModel>();

}
