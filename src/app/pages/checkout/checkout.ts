import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { EcommerceStore } from '../../ecommerce-store';
import { BackButton } from '../../components/back-button/back-button';
import { SummarizeOrder } from '../../components/summarize-order/summarize-order';
import { CollectionDate } from '../../components/collection-date/collection-date';
import { CollectionTime } from '../../components/collection-time/collection-time';
import { ShippingForm } from '../shipping-form/shipping-form';
import { ShippingModel } from '../../models/checkout';

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
    CollectionDate,
    CollectionTime,
    ShippingForm,
  ],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout {
  readonly defaultLocation = 'Khyber Foods LTD, Unit C Doris Rd, Birmingham B9 4SJ, UK';

  store = inject(EcommerceStore);
  fb = inject(NonNullableFormBuilder);

  checkoutMode = signal<'delivery' | 'collection'>(
    this.store.checkout().mode || 'collection'
  );

  // ── Shipping group — mirrors ShippingModel exactly ────────────────────────
  shippingGroup = this.fb.group({
    firstName:     ['', Validators.required],
    lastName:      ['', Validators.required],
    address:       ['', Validators.required],
    city:          ['', Validators.required],
    state:         ['', Validators.required],
    zipCode:       ['', [Validators.required, Validators.minLength(4)]],
    paymentMethod: ['cashOnDelivery' as ShippingModel['paymentMethod'], Validators.required],
  });

  // ── Collection group ──────────────────────────────────────────────────────
  collectionGroup = this.fb.group({
    collectionLocation: [this.defaultLocation, Validators.required],
    collectionDate:     new FormControl<Date | null>(null, Validators.required),
    collectionTime:     new FormControl<Date | null>(null, Validators.required),
  });

  // ── Payment group ─────────────────────────────────────────────────────────
  checkoutForm = this.fb.group({
    paymentMethod: ['cashOnDelivery', Validators.required],
  });

  // Typed control accessors for template
  get collectionDateControl(): FormControl {
    return this.collectionGroup.controls.collectionDate as FormControl;
  }

  get collectionTimeControl(): FormControl {
    return this.collectionGroup.controls.collectionTime as FormControl;
  }

  constructor() {
    // 1. Restore persisted state
    const saved = this.store.checkout();

    this.shippingGroup.patchValue({
      ...(saved.shipping ?? {}),
    });

    this.collectionGroup.patchValue({
      collectionLocation: saved.collectionLocation ?? this.defaultLocation,
      collectionDate: saved.collectionDate ? new Date(saved.collectionDate) : null,
      collectionTime: saved.collectionTime ? new Date(saved.collectionTime as string) : null,
    });

    // 2. Apply initial mode
    this.applyMode(this.checkoutMode());

    // 3. Form → store sync
    merge(
      this.shippingGroup.valueChanges,
      this.collectionGroup.valueChanges,
      this.checkoutForm.valueChanges,
    )
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.syncStoreFromForm());
  }

  get isDeliveryMode(): boolean {
    return this.checkoutMode() === 'delivery';
  }

  toggleCheckoutMode(): void {
    const newMode = this.isDeliveryMode ? 'collection' : 'delivery';
    this.checkoutMode.set(newMode);
    this.applyMode(newMode);
    this.store.updateCheckout({ mode: newMode });
  }

  private applyMode(mode: 'delivery' | 'collection'): void {
    if (mode === 'delivery') {
      this.shippingGroup.enable();
      this.collectionGroup.disable();
    } else {
      this.shippingGroup.disable();
      this.collectionGroup.enable();
    }
  }

  private syncStoreFromForm(): void {
    const mode = this.checkoutMode();
    const collectionRaw = this.collectionGroup.getRawValue();
    const shippingRaw   = this.shippingGroup.getRawValue();

    this.store.updateCheckout({
      mode,
      shipping:           mode === 'delivery'   ? (shippingRaw as ShippingModel) : null,
      collectionDate:     mode === 'collection' ? (collectionRaw.collectionDate as unknown as Date) : null,
      collectionTime:     mode === 'collection' ? (collectionRaw.collectionTime as unknown as string) : null,
      collectionLocation: collectionRaw.collectionLocation,
    });
  }

  submitCheckout(): void {
    const activeGroupValid = this.isDeliveryMode
      ? this.shippingGroup.valid
      : this.collectionGroup.valid;

    if (this.checkoutForm.valid && activeGroupValid) {
      this.store.placeOrder();
    } else {
      this.checkoutForm.markAllAsTouched();
      this.shippingGroup.markAllAsTouched();
      this.collectionGroup.markAllAsTouched();
    }
  }
}