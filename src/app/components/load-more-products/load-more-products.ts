import { Component, inject } from '@angular/core';
import { EcommerceStore } from '../../ecommerce-store';
import { SharedModule } from '../../modules/shared';

@Component({
  selector: 'app-load-more-products',
  imports: [SharedModule],
  templateUrl: './load-more-products.html',
  styleUrl: './load-more-products.scss',
})
export class LoadMoreProducts {
  store = inject(EcommerceStore);

  onLoadMore() {
    this.store.loadMoreProducts();
  }
}
