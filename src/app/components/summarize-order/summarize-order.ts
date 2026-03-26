import { Component, computed, inject } from '@angular/core';
import { ViewPanel } from '../../directives/view-panel';
import { EcommerceStore } from '../../ecommerce-store';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-summarize-order',
  imports: [ViewPanel, MatButton, CommonModule],
  templateUrl: './summarize-order.html',
  styleUrl: './summarize-order.scss',
})
export class SummarizeOrder {
  store = inject(EcommerceStore);

  subTotal = computed(() => {
    return Math.round(
      this.store
      .cartItems()
      .reduce((acc, item) => acc + item.product.price * item.quantity, 0)
    ) 
  });

  tax = computed(() => Math.round(this.subTotal() * 0.1));

  total = computed(() => Math.round(this.subTotal() + this.tax()));
}
