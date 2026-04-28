import { Component, effect, inject, signal, Signal } from '@angular/core';
import { BackButton } from '../../components/back-button/back-button';
import { ShippingForm } from '../shipping-form/shipping-form';
import { PaymentForm } from '../payment-form/payment-form';
import { SummarizeOrder } from '../../components/summarize-order/summarize-order';
import { EcommerceStore } from '../../ecommerce-store';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Location } from "../../components/location/location";
import { ViewPanel } from "../../directives/view-panel";
import { CollectionDetails } from "../../components/collection-details/collection-details";
import { CheckoutModel } from '../../models/checkout';

@Component({
  selector: 'app-checkout',
  imports: [BackButton, MatButton, ShippingForm, PaymentForm, SummarizeOrder, CommonModule, Location, ViewPanel, CollectionDetails],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
  host: { class: 'block' },
})
export class Checkout {
store = inject(EcommerceStore);

constructor() {
  // console.log(this.store.checkout());
}


}
