import { Component, inject } from '@angular/core';
import { EcommerceStore } from '../../ecommerce-store';
import { BackButton } from "../../components/back-button/back-button";
import { ListCartItems } from "../list-cart-items/list-cart-items";
import { TeaseWishlist } from '../tease-wishlist/tease-wishlist';
import { SummarizeOrder } from '../../components/summarize-order/summarize-order';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-view-cart',
  imports: [BackButton, MatButton, ListCartItems, TeaseWishlist, SummarizeOrder],
  templateUrl: './view-cart.html',
  styleUrl: './view-cart.scss',
})
export class ViewCart {
  store = inject(EcommerceStore);

}
