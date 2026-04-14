import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
@Component({
  selector: 'app-collection-time',
  imports: [MatFormFieldModule, MatInputModule, MatTimepickerModule],
  templateUrl: './collection-time.html',
  styleUrl: './collection-time.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionTime {

}
