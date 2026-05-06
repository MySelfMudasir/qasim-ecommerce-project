import { Component, computed, inject, input, output } from '@angular/core';
import { ProductModel } from '../../models/product';
import { MatAnchor, MatButton } from "@angular/material/button";
import { MatIcon } from '@angular/material/icon';
import { EcommerceStore } from '../../ecommerce-store';
import { RouterLink } from "@angular/router";
import { StarRating } from "../star-rating/star-rating";
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-popular-products',
  imports: [MatIcon, MatButton, RouterLink, StarRating, CommonModule],
  templateUrl: './popular-products.html',
  styleUrl: './popular-products.scss',
})
export class PopularProducts {
  product = input.required<ProductModel>();
  store = inject(EcommerceStore);

}
