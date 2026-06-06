import { Component, inject } from '@angular/core';
import { ViewPanel } from '../../directives/view-panel';
import { CollectionDate } from '../collection-date/collection-date';
import { CollectionTime } from '../collection-time/collection-time';
import { EcommerceStore } from '../../ecommerce-store';
import { NonNullableFormBuilder, FormControl, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';
import { SharedModule } from '../../modules/shared';

@Component({
  selector: 'app-collection-details',
  imports: [ViewPanel, SharedModule, CollectionDate, CollectionTime],
  templateUrl: './collection-details.html',
  styleUrl: './collection-details.scss',
})
export class CollectionDetails {
  store = inject(EcommerceStore);
  fb = inject(NonNullableFormBuilder);

  collectionGroup = this.fb.group({
    collectionDate: new FormControl<Date | null>(null, Validators.required),
    collectionTime: new FormControl<Date | null>(null, Validators.required),
    collectionLocation: new FormControl<string>(
      this.store.checkout().collection?.collectionLocation || '',
      Validators.required,
    ),
  });

  get collectionDateControl(): FormControl {
    return this.collectionGroup.controls.collectionDate as FormControl;
  }

  get collectionTimeControl(): FormControl {
    return this.collectionGroup.controls.collectionTime as FormControl;
  }

  constructor() {
    // Restore from store
    const saved = this.store.checkout();
    this.collectionGroup.patchValue({
      collectionDate: saved.collection?.collectionDate
        ? new Date(saved.collection?.collectionDate)
        : null,
      collectionTime: saved.collection?.collectionTime
        ? new Date(saved.collection?.collectionTime as string)
        : null,
    });

    // Sync to store on change
    merge(this.collectionGroup.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        const raw = this.collectionGroup.getRawValue();
        this.store.updateCheckout({
          collection: {
            collectionDate: raw.collectionDate as unknown as Date,
            collectionTime: raw.collectionTime as unknown as string,
            collectionLocation: raw.collectionLocation as string,
          },
        });
      });
  }
}
