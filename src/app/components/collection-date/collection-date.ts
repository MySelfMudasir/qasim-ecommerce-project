import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-collection-date',
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule],
  templateUrl: './collection-date.html',
  styleUrl: './collection-date.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionDate {
  collectionDate = signal<Date>(new Date());
  minDate = new Date();
  maxDate = new Date(new Date().setDate(new Date().getDate() + 1));

  store = inject(EcommerceStore);
  
  ngOnInit() {
    this.store.updateCheckout({
      collectionDate: this.collectionDate() || new Date(),
    });
  }

  onChange(date: Date | null) {
    if (!date) return;
    this.store.updateCheckout({
      collectionDate: date,
    });
  }




}
