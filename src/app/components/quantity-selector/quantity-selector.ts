import { Component, input, output } from '@angular/core';
import { SharedModule } from '../../modules/shared';

@Component({
  selector: 'app-quantity-selector',
  imports: [SharedModule],
  templateUrl: './quantity-selector.html',
  styleUrl: './quantity-selector.scss',
})
export class QuantitySelector {
quantity = input(0);
quantityUpdate = output<number>();

}
