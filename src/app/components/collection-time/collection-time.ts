import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
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


  onChange(value: unknown) {
    if (!(value instanceof Date)) return;
    const time = value.toTimeString().slice(0, 5); // "HH:mm"
    this.store.updateCheckout({
      collectionTime: time,
    });
  }


}
