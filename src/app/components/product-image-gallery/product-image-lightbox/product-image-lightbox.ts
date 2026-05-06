import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface LightboxData {
  images: string[];
  startIndex: number;
  productName: string;
}

@Component({
  selector: 'app-product-image-lightbox',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './product-image-lightbox.html',
  styleUrl: './product-image-lightbox.scss',
})
export class ProductImageLightboxComponent implements OnInit {
  private dialogRef = inject(MatDialogRef<ProductImageLightboxComponent>);
  private data = inject(MAT_DIALOG_DATA) as LightboxData;

  currentIndex = signal(0);
  images = signal<string[]>([]);
  productName = signal('Product');
  isZoomed = signal(false);

  currentImage = computed(() => this.images()[this.currentIndex()]);

  ngOnInit() {
    this.images.set(this.data.images);
    this.currentIndex.set(this.data.startIndex || 0);
    this.productName.set(this.data.productName);
  }

  previousImage() {
    const current = this.currentIndex();
    const prev = current === 0 ? this.images().length - 1 : current - 1;
    this.currentIndex.set(prev);
  }

  nextImage() {
    const current = this.currentIndex();
    const next = current === this.images().length - 1 ? 0 : current + 1;
    this.currentIndex.set(next);
  }

  goToImage(index: number) {
    this.currentIndex.set(index);
  }

  toggleZoom() {
    this.isZoomed.update(val => !val);
  }

  close() {
    this.dialogRef.close();
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      this.previousImage();
      event.preventDefault();
    } else if (event.key === 'ArrowRight') {
      this.nextImage();
      event.preventDefault();
    } else if (event.key === 'Escape') {
      this.close();
    }
  }
}
