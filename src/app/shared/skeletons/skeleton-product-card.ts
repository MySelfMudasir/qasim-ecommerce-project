import { Component } from '@angular/core';

@Component({
  selector: 'app-skeleton-product-card',
  standalone: true,
  imports: [],
    template: `
    <div class="animate-pulse rounded-xl shadow-md overflow-hidden flex flex-col h-full" style="background-color: var(--app-surface)">
      <!-- Image (same as aspect-square) -->
      <div class="w-full aspect-square" style="background-color: #e5e7eb;"></div>
      <div class="p-3 md:p-4 flex flex-col flex-1 space-y-2 md:space-y-3">
        <!-- Title -->
        <div class="h-3 md:h-5 rounded w-3/4" style="background-color: #e5e7eb;"></div>
        <!-- Description (hidden on mobile like real card) -->
        <div class="hidden md:flex flex-col gap-2">
          <div class="h-4 rounded w-full" style="background-color: #e5e7eb;"></div>
          <div class="h-4 rounded w-5/6" style="background-color: #e5e7eb;"></div>
        </div>
        <!-- Rating -->
        <div class="h-3 md:h-4 rounded w-1/3" style="background-color: #e5e7eb;"></div>
        <!-- Stock (hidden on mobile) -->
        <div class="hidden md:block h-3 rounded w-1/4" style="background-color: #e5e7eb;"></div>
        <!-- Bottom section -->
        <div class="mt-auto flex flex-col gap-3">
          <!-- Price -->
          <div class="h-5 md:h-6 rounded w-1/3" style="background-color: #e5e7eb;"></div>
          <!-- Button -->
          <div class="h-9 md:h-10 rounded w-full" style="background-color: #e5e7eb;"></div>
        </div>
      </div>
    </div>
  `,
  styles: [``],
})
export class SkeletonProductCard {

}
