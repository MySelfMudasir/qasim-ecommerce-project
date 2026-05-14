import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-skeleton-product-image-gallery',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="animate-pulse product-gallery">
      <!-- Main Image -->
      <div
        class="relative rounded-lg overflow-hidden w-full h-80 sm:h-105 lg:h-137.5"
        style="background-color: #e5e7eb;"
      >
        <!-- Fullscreen button -->
        <div
          class="absolute top-3 right-3 w-10 h-10 rounded-lg"
          style="background-color: #d1d5db;"
        ></div>
        <!-- Prev button -->
        <div
          class="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg"
          style="background-color: #d1d5db;"
        ></div>
        <!-- Next button -->
        <div
          class="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg"
          style="background-color: #d1d5db;"
        ></div>

        <!-- Counter -->
        <div
          class="absolute bottom-3 left-3 h-6 w-16 rounded"
          style="background-color: #d1d5db;"
        ></div>
      </div>

      <!-- Thumbnails -->
      <div class="mt-4 flex gap-2 overflow-x-auto pb-2">
        <div
          *ngFor="let item of [1, 2, 3, 4]"
          class="w-16 h-16 sm:w-20 sm:h-20 rounded-lg shrink-0"
          style="background-color: #e5e7eb;"
        ></div>
      </div>
    </div>
  `,
  styles: [``],
})
export class SkeletonProductImageGallery {}
