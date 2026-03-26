import { Component, inject, signal } from '@angular/core';
import { ViewPanel } from '../../directives/view-panel';
import {
  FormBuilder,
  FormGroup,
  FormGroupName,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EcommerceStore } from '../../ecommerce-store';
import { OptionItemModel } from '../../models/option-item';
import { MatButton } from '@angular/material/button';
import { AddReviewParams } from '../../models/user-review';

@Component({
  selector: 'app-write-review',
  imports: [
    ViewPanel,
    ReactiveFormsModule,
    MatLabel,
    MatInputModule,
    MatButton,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatFormField,
  ],
  templateUrl: './write-review.html',
  styleUrl: './write-review.scss',
  host: {
    class: 'block',
  },
})
export class WriteReview {
  store = inject(EcommerceStore);
  fb = inject(FormBuilder);

  ratingOptions = signal<OptionItemModel[]>([
    { value: 5, label: '5 Stars - Excellent' },
    { value: 4, label: '4 Stars - Very Good' },
    { value: 3, label: '3 Stars - Good' },
    { value: 2, label: '2 Stars - Fair' },
    { value: 1, label: '1 Stars - Poor' },
  ]);

  reviewForm = this.fb.group({
  title: ['Great Product', [Validators.required, Validators.maxLength(120)]],
    rating: [5, [Validators.required]],
    comment: ['This is a great product!', [Validators.required, Validators.minLength(10)]],
  });

  saveReview(): void {
    if (this.reviewForm.invalid) {
      this.reviewForm.markAllAsTouched();
      return;
    }

    const {title, rating, comment} = this.reviewForm.value;
    this.store.addReview({title, rating, comment} as AddReviewParams);

  }
}
