import { Component, input } from '@angular/core';
import { SharedModule } from '../../modules/shared';

@Component({
  selector: 'app-stock-status',
  imports: [SharedModule],
  templateUrl: './stock-status.html',
  styleUrl: './stock-status.scss',
  host: {
    class: 'block',
  }
})
export class StockStatus {

  inStock = input<boolean>(false);

}
