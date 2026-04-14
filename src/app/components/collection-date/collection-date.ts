import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-collection-date',
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule],
  templateUrl: './collection-date.html',
  styleUrl: './collection-date.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionDate {

  date = signal(new Date());
  minDate = new Date();
  maxDate = new Date(new Date().setDate(new Date().getDate() + 1));


}
