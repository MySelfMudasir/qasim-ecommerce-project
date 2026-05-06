import { Component, computed, inject, input, output } from '@angular/core';
import { ProductModel } from '../../models/product';
import { MatAnchor, MatButton } from "@angular/material/button";
import { MatIcon } from '@angular/material/icon';
import { EcommerceStore } from '../../ecommerce-store';
import { RouterLink } from "@angular/router";
import { StarRating } from "../star-rating/star-rating";
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-recommended-products',
  imports: [MatIcon, MatButton, RouterLink, StarRating, CommonModule],
  templateUrl: './recommended-products.html',
  styleUrl: './recommended-products.scss',
})
export class RecommendedProducts {
  product = input.required<ProductModel>();
  store = inject(EcommerceStore);

}
