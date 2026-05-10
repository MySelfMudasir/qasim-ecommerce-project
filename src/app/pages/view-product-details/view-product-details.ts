import { Component, computed, effect, inject, input } from '@angular/core';
import { EcommerceStore } from '../../ecommerce-store';
import { BackButton } from '../../components/back-button/back-button';
import { MatIcon } from '@angular/material/icon';
import { ToggleWishlistButton } from '../../components/toggle-wishlist-button/toggle-wishlist-button';
import { ProductInfo } from '../product-info/product-info';
import { ViewReviews } from '../view-reviews/view-reviews';
import { ProductImageGallery } from '../../components/product-image-gallery/product-image-gallery';
import { RecommendedProducts } from "../../components/recommended-products/recommended-products";
import { PopularProducts } from "../../components/popular-products/popular-products";
import { TopSellingProducts } from "../../components/top-selling-products/top-selling-products";
import { SearchBar } from '../../components/search-bar/search-bar';

@Component({
  selector: 'app-view-product-details',
  imports: [BackButton, MatIcon, ToggleWishlistButton, ProductInfo, ViewReviews, ProductImageGallery, RecommendedProducts, PopularProducts, TopSellingProducts, SearchBar],
  templateUrl: './view-product-details.html',
  styleUrl: './view-product-details.scss',
})
export class ViewProductDetails {
  productId = input.required<string>();
  store = inject(EcommerceStore);

  constructor() {
    this.store.setProductId(this.productId);

    effect(() => {
      const product = this.store.selectedProduct();
      if (product) {
        this.store.setProductSeoTags(product);
      }
    });
  }

  backRoute = computed(() => {
    return `/products/${this.store.selectedCategory()}`;
  });
}
