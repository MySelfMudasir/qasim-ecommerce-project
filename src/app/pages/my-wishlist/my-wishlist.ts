import { Component, inject } from '@angular/core';
import { BackButton } from "../../components/back-button/back-button";
import { EcommerceStore } from '../../ecommerce-store';
import { ProductCard } from "../../components/product-card/product-card";
import { MatIcon } from "@angular/material/icon";
import { MatAnchor } from "@angular/material/button";
import { ToggleWishlistButton } from "../../components/toggle-wishlist-button/toggle-wishlist-button";
import { EmptyWishlist } from '../empty-wishlist/empty-wishlist';
import { SkeletonCard } from "../../shared/skeleton-card/skeleton-card";

@Component({
  selector: 'app-my-wishlist',
  imports: [BackButton, ProductCard, MatIcon, MatAnchor, EmptyWishlist, SkeletonCard],
  templateUrl: './my-wishlist.html',
  styleUrl: './my-wishlist.scss',
})
export class MyWishlist {

  store = inject(EcommerceStore);

  ngOnInit() {
    this.store.openWishlist(); // THIS IS THE KEY
  }


}
