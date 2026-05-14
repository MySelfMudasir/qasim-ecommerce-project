import { Component, inject } from '@angular/core';
import { BackButton } from "../../components/back-button/back-button";
import { EcommerceStore } from '../../ecommerce-store';
import { ProductCard } from "../../components/product-card/product-card";
import { MatIcon } from "@angular/material/icon";
import { MatAnchor } from "@angular/material/button";
import { ToggleWishlistButton } from "../../components/toggle-wishlist-button/toggle-wishlist-button";
import { EmptyWishlist } from '../empty-wishlist/empty-wishlist';
import { SkeletonProductCard } from "../../shared/skeletons/skeleton-product-card";
import { SkeletonComponent } from "boneyard-js/angular";

@Component({
  selector: 'app-my-wishlist',
  imports: [BackButton, ProductCard, MatIcon, MatAnchor, EmptyWishlist, SkeletonProductCard, SkeletonComponent],
  templateUrl: './my-wishlist.html',
  styleUrl: './my-wishlist.scss',
})
export class MyWishlist {

  store = inject(EcommerceStore);

  ngOnInit() {
    this.store.openWishlist(); // THIS IS THE KEY
  }


}
