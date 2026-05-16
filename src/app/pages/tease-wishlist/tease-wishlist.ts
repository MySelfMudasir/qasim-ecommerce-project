import { Component, inject } from '@angular/core';
import { ViewPanel } from '../../directives/view-panel';
import { EcommerceStore } from '../../ecommerce-store';
import { SharedModule } from '../../modules/shared';

@Component({
  selector: 'app-tease-wishlist',
  imports: [ViewPanel, SharedModule],
  templateUrl: './tease-wishlist.html',
  styleUrl: './tease-wishlist.scss',
})
export class TeaseWishlist {
store = inject(EcommerceStore);
}
