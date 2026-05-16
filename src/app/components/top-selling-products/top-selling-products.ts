import { Component, computed, inject, input, output } from '@angular/core';
import { ProductModel } from '../../models/product';
import { EcommerceStore } from '../../ecommerce-store';
import { StarRating } from "../star-rating/star-rating";
import { SharedModule } from '../../modules/shared';

@Component({
  selector: 'app-top-selling-products',
  imports: [SharedModule, StarRating],
  templateUrl: './top-selling-products.html',
  styleUrl: './top-selling-products.scss',
})
export class TopSellingProducts {
  product = input.required<ProductModel>();
  store = inject(EcommerceStore);

}
