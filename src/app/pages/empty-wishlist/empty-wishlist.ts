import { Component } from '@angular/core';
import { SharedModule } from '../../modules/shared';

@Component({
  selector: 'app-empty-wishlist',
  imports: [SharedModule],
  templateUrl: './empty-wishlist.html',
  styleUrl: './empty-wishlist.scss',
})
export class EmptyWishlist {

}
