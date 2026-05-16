import { Component, computed, inject, input } from '@angular/core';
import { cartModel } from '../../models/cart';
import { QuantitySelector } from '../../components/quantity-selector/quantity-selector';
import { EcommerceStore } from '../../ecommerce-store';
import { SharedModule } from '../../modules/shared';

@Component({
  selector: 'app-show-cart-item',
  imports: [QuantitySelector, SharedModule],
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
