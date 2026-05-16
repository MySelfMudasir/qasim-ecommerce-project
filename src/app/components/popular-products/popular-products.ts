import { Component, inject, input, output } from '@angular/core';
import { ProductModel } from '../../models/product';
import { EcommerceStore } from '../../ecommerce-store';
import { StarRating } from "../star-rating/star-rating";
import { SharedModule } from '../../modules/shared';

@Component({
  selector: 'app-popular-products',
  imports: [StarRating, SharedModule],
  templateUrl: './popular-products.html',
  styleUrl: './popular-products.scss',
})
export class PopularProducts {
  product = input.required<ProductModel>();
  store = inject(EcommerceStore);

}
