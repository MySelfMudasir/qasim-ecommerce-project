import { Component, computed, inject, input, output } from '@angular/core';
import { ProductModel } from '../../models/product';
import { MatAnchor, MatButton } from "@angular/material/button";
import { MatIcon } from '@angular/material/icon';
import { EcommerceStore } from '../../ecommerce-store';
import { RouterLink } from "@angular/router";
import { StarRating } from "../star-rating/star-rating";
import { SkeletonCard } from '../../shared/skeleton-card/skeleton-card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [MatIcon, MatButton, RouterLink, StarRating, SkeletonCard, CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {

  product = input.required<ProductModel>();
  addToCartClicked = output<ProductModel>();

  store = inject(EcommerceStore);




}
