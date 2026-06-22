import { Component } from '@angular/core';
import { SharedModule } from '../../modules/shared';

@Component({
  selector: 'app-empty-orders',
  imports: [SharedModule],
  templateUrl: './empty-orders.html',
  styleUrl: './empty-orders.scss',
})
export class EmptyOrders {

}
