import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-collection-time',
  imports: [MatInputModule, MatTimepickerModule, ReactiveFormsModule],
  templateUrl: './collection-time.html',
  styleUrl: './collection-time.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionTime {
  // Receive the FormControl from the parent form group
  control = input.required<FormControl>();
}