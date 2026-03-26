import { Component, inject, input, signal } from '@angular/core';
import { ProductModel } from '../../models/product';
import { CommonModule } from '@angular/common';
import { StockStatus } from '../stock-status/stock-status';
import { QuantitySelector } from "../../quantity-selector/quantity-selector";
import { MatIcon } from '@angular/material/icon';
import { EcommerceStore } from '../../ecommerce-store';
import { ToggleWishlistButton } from "../../components/toggle-wishlist-button/toggle-wishlist-button";
import { MatButtonModule, MatIconButton } from "@angular/material/button";
import { StarRating } from "../../components/star-rating/star-rating";

@Component({
  selector: 'app-product-info',
  imports: [CommonModule, StockStatus, QuantitySelector, MatIcon, ToggleWishlistButton, MatButtonModule, MatIconButton, StarRating],
  templateUrl: './product-info.html',
  styleUrl: './product-info.scss',
})
export class ProductInfo {
store = inject(EcommerceStore);
  product = input.required<ProductModel>();
  quantity = signal(1);
}
