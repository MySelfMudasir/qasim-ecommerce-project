import { ChangeDetectionStrategy, Component, inject, input, output, signal, OnInit } from '@angular/core';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-collection-time',
  imports: [MatInputModule, MatTimepickerModule],
  templateUrl: './collection-time.html',
  styleUrl: './collection-time.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionTime {
  collectionTime = signal<string>('');
  store = inject(EcommerceStore);

  ngOnInit() {
    const existing = this.store.checkout().collectionTime;
    console.log('CollectionTime ngOnInit, store value:', existing);
    if (existing) {
      this.collectionTime.set(existing);
    }
  }

  onChange(value: unknown) {
    let time: string | null = null;
    if (value instanceof Date) {
      time = value.toTimeString().slice(0, 5); // "HH:mm"
    } else if (typeof value === 'string') {
      time = value;
    }

    if (!time) return;
    this.collectionTime.set(time);
    this.store.updateCheckout({ collectionTime: time });
  }


}
