import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';

import { EcommerceStore } from '../../ecommerce-store';
import { BackButton } from '../../components/back-button/back-button';
import { SummarizeOrder } from '../../components/summarize-order/summarize-order';
import { CollectionDate } from '../../components/collection-date/collection-date';
import { CollectionTime } from '../../components/collection-time/collection-time';
import { ShippingForm } from '../shipping-form/shipping-form';
import { ShippingModel } from '../../models/checkout';
import { SharedModule } from '../../modules/shared';

@Component({
  selector: 'app-checkout',
  imports: [
    SharedModule,
    BackButton,
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

  // Pre-fill defaults so the form is valid as soon as it's enabled
  private readonly defaultShipping = {
    firstName:     'John',
    lastName:      'Doe',
    address:       '123 Main St',
    city:          'Birmingham',
    state:         'West Midlands',
    zipCode:       'B9 4SJ',
    paymentMethod: 'cashOnDelivery' as ShippingModel['paymentMethod'],
  };

  store = inject(EcommerceStore);
  fb = inject(NonNullableFormBuilder);

  checkoutMode = signal<'delivery' | 'collection'>(
    this.store.checkout().mode || 'collection'
  );

  // ── Shipping group — pre-filled with defaults so it's valid on enable ─────
  shippingGroup = this.fb.group({
    firstName:     [this.defaultShipping.firstName,     Validators.required],
    lastName:      [this.defaultShipping.lastName,      Validators.required],
    address:       [this.defaultShipping.address,       Validators.required],
    city:          [this.defaultShipping.city,          Validators.required],
    state:         [this.defaultShipping.state,         Validators.required],
    zipCode:       [this.defaultShipping.zipCode,       [Validators.required, Validators.minLength(4)]],
    // paymentMethod: [this.defaultShipping.paymentMethod, Validators.required],
  });

  // ── Collection group ──────────────────────────────────────────────────────
  collectionGroup = this.fb.group({
    collectionLocation: [this.defaultLocation, Validators.required],
    collectionDate:     new FormControl<Date | null>(null, Validators.required),
    collectionTime:     new FormControl<Date | null>(null, Validators.required),
  });

  // ── Payment group ─────────────────────────────────────────────────────────
  checkoutForm = this.fb.group({
    // paymentMethod: ['cashOnDelivery', Validators.required],
  });

  // Typed control accessors for template
  get collectionDateControl(): FormControl {
    return this.collectionGroup.controls.collectionDate as FormControl;
  }

  get collectionTimeControl(): FormControl {
    return this.collectionGroup.controls.collectionTime as FormControl;
  }

  constructor() {
    // 1. Restore persisted state (overrides defaults if saved data exists)
    const saved = this.store.checkout();

    if (saved.shipping) {
      this.shippingGroup.patchValue(saved.shipping);
    }

    this.collectionGroup.patchValue({
      collectionLocation: saved.collectionLocation ?? this.defaultLocation,
      collectionDate: saved.collectionDate ? new Date(saved.collectionDate) : null,
      collectionTime: saved.collectionTime ? new Date(saved.collectionTime as string) : null,
    });

    // 2. Apply initial mode — runs after values are set so validity is correct
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
    // Force Angular to re-evaluate validity immediately after enable/disable
    this.shippingGroup.updateValueAndValidity();
    this.collectionGroup.updateValueAndValidity();
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

  submitCheckout() {
    // console.log('Submitting checkout. Check console for form values and validity.');
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