import { Component, computed, effect, inject, input } from '@angular/core';
import { EcommerceStore } from '../../ecommerce-store';
import { BackButton } from '../../components/back-button/back-button';
import { ToggleWishlistButton } from '../../components/toggle-wishlist-button/toggle-wishlist-button';
import { ProductInfo } from '../product-info/product-info';
import { ViewReviews } from '../view-reviews/view-reviews';
import { ProductImageGallery } from '../../components/product-image-gallery/product-image-gallery';
import { RecommendedProducts } from "../../components/recommended-products/recommended-products";
import { PopularProducts } from "../../components/popular-products/popular-products";
import { TopSellingProducts } from "../../components/top-selling-products/top-selling-products";
import { SearchBar } from '../../components/search-bar/search-bar';
import { SkeletonProductImageGallery } from "../../shared/skeletons/skeleton-product-image-gallery";
import { SkeletonProductInfo } from "../../shared/skeletons/skeleton-product-info";
import { SkeletonProductCard } from "../../shared/skeletons/skeleton-product-card";
import { SharedModule } from '../../modules/shared';

@Component({
  selector: 'app-view-product-details',
  imports: [BackButton, SharedModule, ToggleWishlistButton, ProductInfo, ViewReviews, ProductImageGallery, RecommendedProducts, PopularProducts, TopSellingProducts, SearchBar, SkeletonProductImageGallery, SkeletonProductInfo, SkeletonProductCard],
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

  ngOnInit() {
    this.store.openWishlist(); // THIS IS THE KEY
  }

  backRoute = computed(() => {
    return `/products/${this.store.selectedCategory()}`;
  });
}
