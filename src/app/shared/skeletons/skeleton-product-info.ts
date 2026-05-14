import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-skeleton-product-info',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="animate-pulse">
      <!-- Category -->
      <div class="h-7 w-24 rounded-xl mb-4" style="background-color: #e5e7eb;"></div>
      <!-- Product Name -->
      <div class="h-8 w-3/4 rounded mb-3" style="background-color: #e5e7eb;"></div>
      <!-- Meta tags -->
      <div class="flex gap-3 mb-5 flex-wrap">
        <div
          *ngFor="let item of [1, 2, 3]"
          class="h-7 w-24 rounded"
          style="background-color: #e5e7eb;"
        ></div>
      </div>

      <!-- Rating -->
      <div class="h-5 w-40 rounded mb-5" style="background-color: #e5e7eb;"></div>
      <!-- Price -->
      <div class="h-9 w-32 rounded mb-5" style="background-color: #e5e7eb;"></div>
      <!-- Stock -->
      <div class="h-5 w-28 rounded mb-5" style="background-color: #e5e7eb;"></div>
      <!-- Description Title -->
      <div class="h-5 w-28 rounded mb-3" style="background-color: #e5e7eb;"></div>

      <!-- Description -->
      <div class="space-y-2 mb-6 pb-4 border-b" style="border-color: var(--app-border);">
        <div class="h-4 w-full rounded" style="background-color: #e5e7eb;"></div>
        <div class="h-4 w-11/12 rounded" style="background-color: #e5e7eb;"></div>
        <div class="h-4 w-4/5 rounded" style="background-color: #e5e7eb;"></div>
      </div>

      <!-- Quantity -->
      <div class="flex items-center gap-3 mb-5">
        <div class="h-5 w-20 rounded" style="background-color: #e5e7eb;"></div>
        <div class="flex gap-2">
          <div class="w-10 h-10 rounded" style="background-color: #e5e7eb;"></div>
          <div class="w-14 h-10 rounded" style="background-color: #e5e7eb;"></div>
          <div class="w-10 h-10 rounded" style="background-color: #e5e7eb;"></div>
        </div>
      </div>

      <!-- Buttons -->
      <div class="flex gap-4 mb-5 pb-5 border-b" style="border-color: var(--app-border);">
        <div class="h-11 flex-1 rounded" style="background-color: #e5e7eb;"></div>
        <div class="h-11 w-11 rounded-full" style="background-color: #e5e7eb;"></div>
        <div class="h-11 w-11 rounded-full" style="background-color: #e5e7eb;"></div>
      </div>

      <!-- Features -->
      <div class="pt-4 flex flex-col gap-4">
        <div *ngFor="let item of [1, 2, 3]" class="flex items-center gap-3">
          <div class="w-5 h-5 rounded" style="background-color: #e5e7eb;"></div>
          <div class="h-4 flex-1 rounded" style="background-color: #e5e7eb;"></div>
        </div>
      </div>
    </div>
  `,
  styles: [``],
})
export class SkeletonProductInfo {}
