import { Component } from '@angular/core';
import { ViewPanel } from '../../directives/view-panel';
import { CollectionDate } from "../collection-date/collection-date";
import { CollectionTime } from "../collection-time/collection-time";

@Component({
  selector: 'app-collection-details',
  imports: [ViewPanel, CollectionDate, CollectionTime],
  templateUrl: './collection-details.html',
  styleUrl: './collection-details.scss',
})
export class CollectionDetails {
  

}
