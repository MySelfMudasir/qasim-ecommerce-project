import { CommonModule } from '@angular/common';
import { Component, Input, signal, computed, effect, OnDestroy, input } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

export interface Slide {
  image: string;
  title?: string;
  subtitle?: string;
}

export interface CarouselConfig {
  autoPlay?: boolean;
  interval?: number;
  animation?: 'slide' | 'fade' | 'zoom';
  showIndicators?: boolean;
  showControls?: boolean;
}

@Component({
  selector: 'app-carousel',
  imports: [CommonModule, MatButton, MatIcon],
  templateUrl: './carousel.html',
  styleUrl: './carousel.scss',
  host: {
    class: 'block',
  }
})
export class Carousel implements OnDestroy {
  // ✅ Inputs
  slides = input<Slide[]>([]);
  config = input<CarouselConfig>({});

  // ✅ Signals
  currentIndex = signal(0);

  // ✅ Defaults
  finalConfig = computed(() => {
    const cfg = this.config();

    return {
      autoPlay: cfg.autoPlay ?? true,
      interval: cfg.interval ?? 2000,
      animation: cfg.animation ?? 'slide',
      showIndicators: cfg.showIndicators ?? true,
      showControls: cfg.showControls ?? true,
    };
  });

  private intervalId: any;

  constructor() {
    effect(() => {
      const cfg = this.finalConfig();
      const slides = this.slides();

      console.log('Slides:', this.slides());
      console.log('Config:', this.config());

      if (cfg.autoPlay && slides.length > 0) {
        this.startAutoSlide();
      } else {
        this.stopAutoSlide();
      }
    });
  }

  startAutoSlide() {
    this.stopAutoSlide();

    this.intervalId = setInterval(() => {
      this.next();
    }, this.finalConfig().interval);
  }

  stopAutoSlide() {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  next() {
    this.currentIndex.update((i) => (i + 1) % this.slides().length);
  }

prev() {
  const slides = this.slides();
  if (!slides.length) return;

  this.currentIndex.update(i => (i - 1 + slides.length) % slides.length);
}

  goTo(index: number) {
    this.currentIndex.set(index);
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }
}
