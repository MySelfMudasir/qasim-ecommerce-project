import { Component, inject, input, output } from '@angular/core';
import { ProductModel } from '../../models/product';
import { EcommerceStore } from '../../ecommerce-store';
import { StarRating } from "../star-rating/star-rating";
import { SharedModule } from '../../modules/shared';

@Component({
  selector: 'app-recommended-products',
  imports: [SharedModule, StarRating],
  templateUrl: './recommended-products.html',
  styleUrl: './recommended-products.scss',
})
export class RecommendedProducts {
  product = input.required<ProductModel>();
  store = inject(EcommerceStore);

}
