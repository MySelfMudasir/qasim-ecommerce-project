import { Component } from '@angular/core';

@Component({
  selector: 'app-skeleton-show-cart-item',
  standalone: true,
  imports: [],
  template: `
    <div class="animate-pulse grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 sm:items-center">
      <!-- Product Info -->
      <div class="col-span-2 flex items-center gap-4 sm:col-span-1">
        <!-- Image -->
        <div
          class="w-20 h-20 sm:w-24 sm:h-24 rounded-lg shrink-0"
          style="background-color: #e5e7eb;"
        ></div>

        <div class="min-w-0 flex-1 space-y-2">
          <!-- Product Name -->
          <div class="h-4 md:h-5 rounded w-3/4" style="background-color: #e5e7eb;"></div>

          <div class="h-4 md:h-5 rounded w-1/3" style="background-color: #e5e7eb;"></div>
        </div>
      </div>

      <!-- Quantity Selector -->
      <div class="col-span-1 flex items-center justify-start sm:justify-center">
        <div class="flex items-center gap-2">
          <div class="w-10 h-10 rounded" style="background-color: #e5e7eb;"></div>

          <div class="w-14 h-10 rounded" style="background-color: #e5e7eb;"></div>

          <div class="w-10 h-10 rounded" style="background-color: #e5e7eb;"></div>
        </div>
      </div>

      <!-- Total + Actions -->
      <div class="col-span-1 flex flex-col items-end justify-center gap-3 sm:items-end">
        <!-- Total -->
        <div class="h-5 w-20 rounded" style="background-color: #e5e7eb;"></div>

        <!-- Action Buttons -->
        <div class="flex gap-2">
          <div class="w-10 h-10 rounded-full" style="background-color: #e5e7eb;"></div>

          <div class="w-10 h-10 rounded-full" style="background-color: #e5e7eb;"></div>
        </div>
      </div>
    </div>
  `,
  styles: [``],
})
export class SkeletonShowCartItem {}
