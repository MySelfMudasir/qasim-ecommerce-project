import { Component, inject } from '@angular/core';
import { ViewPanel } from '../../directives/view-panel';
import { CollectionDate } from "../collection-date/collection-date";
import { CollectionTime } from "../collection-time/collection-time";
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-collection-details',
  imports: [ViewPanel, CollectionDate, CollectionTime],
  templateUrl: './collection-details.html',
  styleUrl: './collection-details.scss',
})
export class CollectionDetails {

  store = inject(EcommerceStore);

  

}
