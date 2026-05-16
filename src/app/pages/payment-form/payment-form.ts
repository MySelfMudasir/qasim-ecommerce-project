import { Component, inject } from '@angular/core';
import { BackButton } from '../../components/back-button/back-button';
import { ShippingForm } from '../shipping-form/shipping-form';
import { SummarizeOrder } from '../../components/summarize-order/summarize-order';
import { EcommerceStore } from '../../ecommerce-store';
import { ViewPanel } from '../../directives/view-panel';
import { SharedModule } from '../../modules/shared';

@Component({
  selector: 'app-payment-form',
  imports: [BackButton,ViewPanel, SharedModule, ShippingForm, SummarizeOrder],
  templateUrl: './payment-form.html',
  styleUrl: './payment-form.scss'
})
export class PaymentForm {
store = inject(EcommerceStore);
}
