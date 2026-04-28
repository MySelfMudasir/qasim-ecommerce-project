import { Component, computed, inject, signal, effect, untracked } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { skip } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { EcommerceStore } from '../../ecommerce-store';
import { BackButton } from '../../components/back-button/back-button';
import { SummarizeOrder } from '../../components/summarize-order/summarize-order';
import { Location } from "../../components/location/location";
import { CollectionDate } from '../../components/collection-date/collection-date';
import { CollectionTime } from '../../components/collection-time/collection-time';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BackButton,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    SummarizeOrder,
    Location,
    CollectionDate,
    CollectionTime,
  ],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout {
  private readonly defaultLocation = 'Khyber Foods LTD, Unit C Doris Rd, Birmingham B9 4SJ, UK';
  
  store = inject(EcommerceStore);
  fb = inject(NonNullableFormBuilder);

  // Local signal to track UI state, initialized from store
  checkoutMode = signal<'delivery' | 'collection'>(this.store.checkout().mode || 'collection');

  // Define Form Groups
  shippingGroup = this.fb.group({
    firstName: ['1234', Validators.required],
    lastName: ['123', Validators.required],
    address: ['123', Validators.required],
    city: ['123', Validators.required],
    state: ['123', Validators.required],
    zipCode: ['1234', [Validators.required, Validators.minLength(4)]],
  });

  collectionGroup = this.fb.group({
    collectionLocation: [this.defaultLocation, Validators.required],
    collectionDate: ['', Validators.required],
    collectionTime: ['', Validators.required],
  });

  checkoutForm = this.fb.group({
    shipping: this.shippingGroup,
    collection: this.collectionGroup,
    paymentMethod: ['cashOnDelivery', Validators.required],
  });


constructor() {
  this.applyMode(this.checkoutMode());

  // 1. Sync Store -> Form (One-way)
  effect(() => {
    const checkoutData = this.store.checkout();
    
    // We use untracked to ensure we don't accidentally subscribe to 
    // form-related signals if there were any
    untracked(() => {
      this.collectionGroup.patchValue({
        collectionDate: checkoutData.collectionDate ? 
          (checkoutData.collectionDate instanceof Date ? 
            checkoutData.collectionDate.toISOString() : 
            new Date(checkoutData.collectionDate).toISOString()) 
          : '',
        collectionTime: checkoutData.collectionTime || ''
      }, { emitEvent: false }); // CRITICAL: emitEvent false breaks the loop
      
      // Update validity manually since we suppressed the event
      this.collectionGroup.get('collectionDate')?.updateValueAndValidity({ emitEvent: false });
      this.collectionGroup.get('collectionTime')?.updateValueAndValidity({ emitEvent: false });
    });
  });

  // 2. Sync Form -> Store
  this.checkoutForm.valueChanges
    .pipe(takeUntilDestroyed(), skip(1))
    .subscribe(() => {
      this.syncStoreFromForm();
    });
}

  get isDeliveryMode(): boolean {
    return this.checkoutMode() === 'delivery';
  }

  toggleCheckoutMode() {
    const newMode = this.isDeliveryMode ? 'collection' : 'delivery';
    this.checkoutMode.set(newMode);
    this.applyMode(newMode);
    this.store.updateCheckout({ mode: newMode });
  }

private applyMode(mode: 'delivery' | 'collection') {
  if (mode === 'delivery') {
    this.shippingGroup.enable({ emitEvent: false });
    this.collectionGroup.disable({ emitEvent: false });
    // Clear collection errors so they don't block the parent form
    this.collectionGroup.reset(this.collectionGroup.getRawValue(), {emitEvent: false});
  } else {
    this.shippingGroup.disable({ emitEvent: false });
    this.collectionGroup.enable({ emitEvent: false });
    this.shippingGroup.reset(this.shippingGroup.getRawValue(), {emitEvent: false});
  }
  this.checkoutForm.updateValueAndValidity(); // Force parent to re-check
}

  private syncStoreFromForm() {
    const rawValues = this.checkoutForm.getRawValue();
    this.store.updateCheckout({
      mode: this.checkoutMode(),
      shipping: this.isDeliveryMode ? {
        ...rawValues.shipping,
        paymentMethod: rawValues.paymentMethod as any
      } : undefined,
      collectionLocation: !this.isDeliveryMode ? rawValues.collection.collectionLocation : undefined,
      collectionDate: !this.isDeliveryMode ? new Date(rawValues.collection.collectionDate) : undefined,
      collectionTime: !this.isDeliveryMode ? rawValues.collection.collectionTime : undefined
    });
  }

  submitCheckout() {
    this.checkoutForm.markAllAsTouched();
    if (this.checkoutForm.valid) {
      this.store.placeOrder();
    }
  }
}