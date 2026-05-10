import { Component, inject } from '@angular/core';
import { EcommerceStore } from '../../ecommerce-store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-load-more-products',
  imports: [MatProgressSpinnerModule, MatButtonModule, CommonModule],
  templateUrl: './load-more-products.html',
  styleUrl: './load-more-products.scss',
})
export class LoadMoreProducts {
  store = inject(EcommerceStore);

  onLoadMore() {
    this.store.loadMoreProducts();
  }
}
