import { ChangeDetectionStrategy, Component, input, OnInit } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-collection-date',
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, ReactiveFormsModule],
  templateUrl: './collection-date.html',
  styleUrl: './collection-date.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionDate {
  // Receive the FormControl from the parent form group
  control = input.required<FormControl>();

  minDate = new Date();
  maxDate = new Date(new Date().setDate(new Date().getDate() + 1));
}