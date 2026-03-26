import { Component, inject, input, computed } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { EcommerceStore } from '../../ecommerce-store';
import { ProductModel } from '../../models/product';
import { MatButton, MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-toggle-wishlist-button',
  imports: [MatIcon, MatIconButton],
  templateUrl: './toggle-wishlist-button.html',
  styleUrl: './toggle-wishlist-button.scss',
})
export class ToggleWishlistButton {
  product = input.required<ProductModel>();
  store = inject(EcommerceStore);

  isInWishlist = computed(() => {
    return this.store.wishlistItems().find((item) => item.id === this.product().id);
  });

  toggleWishlist(product: ProductModel) {
    if (this.isInWishlist()) {
      this.store.removeFromWishlist(product);
    } else {
      console.log();

      this.store.addToWishlist(product);
    }
  }
}
