import { Component, computed, input } from '@angular/core';
import { SharedModule } from '../../modules/shared';

@Component({
  selector: 'app-star-rating',
  imports: [SharedModule],
  templateUrl: './star-rating.html',
  styleUrl: './star-rating.scss',
})
export class StarRating {
  rating = input.required<number>();

  starArray = computed(() => {
    const fullStars = Math.floor(this.rating());
    return Array(5).fill(false).map((_, index) => index < fullStars);
  })

}
