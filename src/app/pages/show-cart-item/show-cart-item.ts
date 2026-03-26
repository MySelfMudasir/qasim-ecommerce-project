import { Component, computed, inject, input } from '@angular/core';
import { cartModel } from '../../models/cart';
import { QuantitySelector } from '../../quantity-selector/quantity-selector';
import { EcommerceStore } from '../../ecommerce-store';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-show-cart-item',
  imports: [QuantitySelector, MatIcon, MatIconButton],
  templateUrl: './show-cart-item.html',
  styleUrl: './show-cart-item.scss',
})
export class ShowCartItem {
  item = input.required<cartModel>();
  store = inject(EcommerceStore);

  total = computed(() => {
    return (this.item().product.price * this.item().quantity).toFixed(2);
  })

}
