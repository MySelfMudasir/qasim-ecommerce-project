import { Component, inject, input, output } from '@angular/core';
import { ProductModel } from '../../models/product';
import { EcommerceStore } from '../../ecommerce-store';
import { StarRating } from "../star-rating/star-rating";
import { SharedModule } from '../../modules/shared';

@Component({
  selector: 'app-product-card',
  imports: [StarRating, SharedModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {

  product = input.required<ProductModel>();
  addToCartClicked = output<ProductModel>();

  store = inject(EcommerceStore);




}
