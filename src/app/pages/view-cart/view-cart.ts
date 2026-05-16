import { Component, inject } from '@angular/core';
import { EcommerceStore } from '../../ecommerce-store';
import { BackButton } from "../../components/back-button/back-button";
import { ListCartItems } from "../list-cart-items/list-cart-items";
import { TeaseWishlist } from '../tease-wishlist/tease-wishlist';
import { SummarizeOrder } from '../../components/summarize-order/summarize-order';
import { SharedModule } from '../../modules/shared';

@Component({
  selector: 'app-view-cart',
  imports: [BackButton, ListCartItems, TeaseWishlist, SummarizeOrder, SharedModule],
  templateUrl: './view-cart.html',
  styleUrl: './view-cart.scss',
})
export class ViewCart {
  store = inject(EcommerceStore);

  ngOnInit() {
    this.store.openWishlist(); // THIS IS THE KEY
  }
}
