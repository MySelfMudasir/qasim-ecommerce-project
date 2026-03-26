import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  HostListener,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CarouselSlide {
  id: number;
  badge?: string;
  headline: string;
  subheadline?: string;
  discount?: string;
  discountLabel?: string;
  ctaText: string;
  ctaLink?: string;
  bgColor: string;
  accentColor: string;
  textColor: string;
  images: SlideImage[];
  layout?: 'left' | 'right' | 'center';
}

export interface SlideImage {
  src: string;
  alt: string;
  classes?: string;
}

@Component({
  selector: 'app-carousel2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel2.html',
  styleUrls: ['./carousel2.scss'],
})
export class Carousel2 implements OnInit, OnDestroy {
  @Input() slides: CarouselSlide[] = DEFAULT_SLIDES;
  @Input() autoPlay = true;
  @Input() autoPlayInterval = 4500;
  @Input() showIndicators = true;
  @Input() showArrows = true;
  @Input() transitionDuration = 600;

  currentIndex = signal(0);
  isAnimating = signal(false);
  isPaused = signal(false);
  direction = signal<'next' | 'prev'>('next');

  private timer: ReturnType<typeof setInterval> | null = null;

  activeSlide = computed(() => this.slides[this.currentIndex()]);

  ngOnInit() {
    if (this.autoPlay) this.startTimer();
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  startTimer() {
    this.clearTimer();
    this.timer = setInterval(() => {
      if (!this.isPaused()) this.next();
    }, this.autoPlayInterval);
  }

  clearTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  goTo(index: number) {
    if (this.isAnimating() || index === this.currentIndex()) return;
    this.direction.set(index > this.currentIndex() ? 'next' : 'prev');
    this.animate(index);
  }

  next() {
    if (this.isAnimating()) return;
    this.direction.set('next');
    this.animate((this.currentIndex() + 1) % this.slides.length);
  }

  prev() {
    if (this.isAnimating()) return;
    this.direction.set('prev');
    this.animate(
      (this.currentIndex() - 1 + this.slides.length) % this.slides.length
    );
  }

  private animate(targetIndex: number) {
    this.isAnimating.set(true);
    this.currentIndex.set(targetIndex);
    setTimeout(() => this.isAnimating.set(false), this.transitionDuration);
  }

  onMouseEnter() {
    this.isPaused.set(true);
  }

  onMouseLeave() {
    this.isPaused.set(false);
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') this.prev();
    if (event.key === 'ArrowRight') this.next();
  }

  trackBySlide(_: number, slide: CarouselSlide) {
    return slide.id;
  }
}

export const DEFAULT_SLIDES: CarouselSlide[] = [
  {
    id: 1,
    badge: 'NEW COLLECTION',
    headline: 'CAKE',
    subheadline: 'Range',
    discount: '50%',
    discountLabel: 'UP TO\nOFF',
    ctaText: 'Claim Your Discount',
    bgColor: '#8aaa8a',
    accentColor: '#c9a84c',
    textColor: '#ffffff',
    layout: 'left',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=420&q=80',
        alt: 'Chocolate cake',
        classes: 'bottom-0 left-[28%] w-48 sm:w-56 md:w-64 z-10',
      },
      {
        src: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=380&q=80',
        alt: 'Cheesecake',
        classes: 'bottom-4 left-[46%] w-44 sm:w-52 md:w-60 z-20',
      },
      {
        src: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=380&q=80',
        alt: 'Red velvet cake',
        classes: 'bottom-0 right-[6%] w-48 sm:w-56 md:w-64 z-10',
      },
    ],
  },
  {
    id: 2,
    badge: 'BEST SELLERS',
    headline: 'PASTRY',
    subheadline: 'Delight',
    discount: '30%',
    discountLabel: 'SAVE\nNOW',
    ctaText: 'Shop Pastries',
    bgColor: '#c8a97e',
    accentColor: '#8b3a3a',
    textColor: '#fff8f0',
    layout: 'left',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80',
        alt: 'Croissant',
        classes: 'bottom-0 left-[26%] w-44 sm:w-52 md:w-60 z-10',
      },
      {
        src: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=380&q=80',
        alt: 'Danish pastry',
        classes: 'bottom-4 left-[46%] w-40 sm:w-48 md:w-56 z-20',
      },
      {
        src: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=380&q=80',
        alt: 'Macaron',
        classes: 'bottom-0 right-[5%] w-44 sm:w-52 md:w-60 z-10',
      },
    ],
  },
  {
    id: 3,
    badge: 'SEASONAL',
    headline: 'BERRY',
    subheadline: 'Specials',
    discount: '40%',
    discountLabel: 'FLASH\nSALE',
    ctaText: 'Explore Now',
    bgColor: '#6b5b7b',
    accentColor: '#e8c4d0',
    textColor: '#fef0f5',
    layout: 'left',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80',
        alt: 'Berry tart',
        classes: 'bottom-0 left-[26%] w-44 sm:w-52 md:w-60 z-10',
      },
      {
        src: 'https://images.unsplash.com/photo-1562440499-64c9a111f713?w=380&q=80',
        alt: 'Strawberry cake',
        classes: 'bottom-4 left-[45%] w-40 sm:w-48 md:w-56 z-20',
      },
      {
        src: 'https://images.unsplash.com/photo-1611293388250-580b08c4a145?w=380&q=80',
        alt: 'Blueberry cheesecake',
        classes: 'bottom-0 right-[5%] w-44 sm:w-52 md:w-60 z-10',
      },
    ],
  },
  {
    id: 4,
    badge: 'CLASSICS',
    headline: 'BREAD',
    subheadline: 'Artisan',
    discount: '20%',
    discountLabel: 'DAILY\nDEAL',
    ctaText: 'Order Fresh',
    bgColor: '#7a6848',
    accentColor: '#f5d98b',
    textColor: '#fdf6e3',
    layout: 'left',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&q=80',
        alt: 'Sourdough bread',
        classes: 'bottom-0 left-[26%] w-44 sm:w-52 md:w-60 z-10',
      },
      {
        src: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=380&q=80',
        alt: 'Baguette',
        classes: 'bottom-4 left-[45%] w-40 sm:w-48 md:w-56 z-20',
      },
      {
        src: 'https://images.unsplash.com/photo-1558303111-7ef1b4b6d59e?w=380&q=80',
        alt: 'Focaccia bread',
        classes: 'bottom-0 right-[5%] w-44 sm:w-52 md:w-60 z-10',
      },
    ],
  },
];