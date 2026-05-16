import { Component, input, signal, computed, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductImageLightboxComponent } from './product-image-lightbox/product-image-lightbox';
import { SharedModule } from '../../modules/shared';

@Component({
  selector: 'app-product-image-gallery',
  imports: [SharedModule],
  templateUrl: './product-image-gallery.html',
  styleUrl: './product-image-gallery.scss',
})
export class ProductImageGallery {
  private dialog = inject(MatDialog);

  images = input<string[]>([]);
  mainImage = input.required<string>();
  productName = input<string>('Product');

  // Reactive signals
  selectedImageIndex = signal(0);
  displayImages = computed(() => {
    const imgs = this.images();
    // If no images array, use only the main image
    if (!imgs || imgs.length === 0) {
      return [this.mainImage()];
    }
    return imgs;
  });

  currentImage = computed(() => {
    return this.displayImages()[this.selectedImageIndex()];
  });

  selectImage(index: number) {
    this.selectedImageIndex.set(index);
  }

  openLightbox(startIndex: number = 0) {
    this.selectedImageIndex.set(startIndex);
    this.dialog.open(ProductImageLightboxComponent, {
      data: {
        images: this.displayImages(),
        startIndex,
        productName: this.productName(),
      },
      width: '100vw',
      height: '100vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'product-lightbox-dialog',
    });
  }

  previousImage() {
    const current = this.selectedImageIndex();
    const prev = current === 0 ? this.displayImages().length - 1 : current - 1;
    this.selectedImageIndex.set(prev);
  }

  nextImage() {
    const current = this.selectedImageIndex();
    const next = current === this.displayImages().length - 1 ? 0 : current + 1;
    this.selectedImageIndex.set(next);
  }
}
