import { Component, inject, input } from '@angular/core';
import { EcommerceStore } from '../../ecommerce-store';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-load-more-products',
  imports: [MatButton],
  templateUrl: './load-more-products.html',
  styleUrl: './load-more-products.scss',
})
export class LoadMoreProducts {
  store = inject(EcommerceStore);

  constructor() {
    // console.log(this.store.selectedCategory()); // ✅ works now
  }
    

}
