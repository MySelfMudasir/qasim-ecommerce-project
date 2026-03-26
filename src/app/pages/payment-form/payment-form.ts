import { Component, inject } from '@angular/core';
import { BackButton } from '../../components/back-button/back-button';
import { ShippingForm } from '../shipping-form/shipping-form';
import { SummarizeOrder } from '../../components/summarize-order/summarize-order';
import { EcommerceStore } from '../../ecommerce-store';
import { MatIcon } from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import { ViewPanel } from '../../directives/view-panel';

@Component({
  selector: 'app-payment-form',
  imports: [BackButton,ViewPanel, MatIcon, ShippingForm, SummarizeOrder, MatRadioModule],
  templateUrl: './payment-form.html',
  styleUrl: './payment-form.scss'
})
export class PaymentForm {
store = inject(EcommerceStore);
}
