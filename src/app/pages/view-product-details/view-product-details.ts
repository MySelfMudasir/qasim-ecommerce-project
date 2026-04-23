import { Component, computed, effect, inject, input, OnInit } from '@angular/core';
import { EcommerceStore } from '../../ecommerce-store';
import { BackButton } from '../../components/back-button/back-button';
import { MatIcon } from '@angular/material/icon';
import { ToggleWishlistButton } from '../../components/toggle-wishlist-button/toggle-wishlist-button';
import { ProductInfo } from '../product-info/product-info';
import { ViewReviews } from '../view-reviews/view-reviews';
import { QuantitySelector } from '../../components/quantity-selector/quantity-selector';

@Component({
  selector: 'app-view-product-details',
  imports: [BackButton, MatIcon, QuantitySelector, ToggleWishlistButton, ProductInfo, ViewReviews],
  templateUrl: './view-product-details.html',
  styleUrl: './view-product-details.scss',
})
export class ViewProductDetails implements OnInit {
  productId = input.required<string>();
  store = inject(EcommerceStore);

  constructor() {
    // effect() is safe in constructor — signals are tracked reactively
    effect(() => {
      const product = this.store.selectedProduct();
      if (product) {
        this.store.setProductSeoTags(product);
      }
    });
  }

  ngOnInit() {
    // input() signals are available here — set product ID synchronously
    this.store.setProductId(this.productId);

    // Also set SEO tags immediately (synchronously) for SSR
    const product = this.store.selectedProduct();
    if (product) {
      this.store.setProductSeoTags(product);
    }
  }

  backRoute = computed(() => {
    return `/products/${this.store.selectedCategory()}`;
  });
}