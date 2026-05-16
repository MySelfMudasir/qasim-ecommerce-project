import { Component, inject, input, signal } from '@angular/core';
import { ProductModel } from '../../models/product';
import { StockStatus } from '../stock-status/stock-status';
import { QuantitySelector } from '../../components/quantity-selector/quantity-selector';
import { EcommerceStore } from '../../ecommerce-store';
import { ToggleWishlistButton } from "../../components/toggle-wishlist-button/toggle-wishlist-button";
import { StarRating } from "../../components/star-rating/star-rating";
import { SharedModule } from '../../modules/shared';

@Component({
  selector: 'app-product-info',
  imports: [SharedModule, StockStatus, QuantitySelector, ToggleWishlistButton, StarRating],
  templateUrl: './product-info.html',
  styleUrl: './product-info.scss',
})
export class ProductInfo {
store = inject(EcommerceStore);
  product = input.required<ProductModel>();
  quantity = signal(1);
}
