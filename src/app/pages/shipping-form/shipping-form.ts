import { Component, input, Input } from '@angular/core';
import { ViewPanel } from '../../directives/view-panel';
import { FormGroup } from '@angular/forms';
import { SharedModule } from '../../modules/shared';

@Component({
  selector: 'app-shipping-form',
  imports: [ViewPanel, SharedModule],
  templateUrl: './shipping-form.html',
  styleUrl: './shipping-form.scss',
})
export class ShippingForm {
group = input.required<FormGroup>();
}
