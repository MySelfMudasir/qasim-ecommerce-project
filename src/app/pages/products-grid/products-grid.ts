import { Component, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EcommerceStore } from '../../ecommerce-store';
import { ProductCard } from '../../components/product-card/product-card';
import { ToggleWishlistButton } from '../../components/toggle-wishlist-button/toggle-wishlist-button';
import { MatIcon } from '@angular/material/icon';
import { Carousel, CarouselConfig } from '../../components/carousel/carousel';
import { MenuBar } from '../../components/menu-bar/menu-bar';
import { SearchBar } from '../../components/search-bar/search-bar';
import { LoadMoreProducts } from '../../components/load-more-products/load-more-products';
import { SkeletonProductCard } from '../../shared/skeletons/skeleton-product-card';
import { PopularProducts } from '../../components/popular-products/popular-products';
import { TopSellingProducts } from '../../components/top-selling-products/top-selling-products';
import { SkeletonComponent } from 'boneyard-js/angular';

@Component({
  selector: 'app-products-grid',
  imports: [
    ProductCard,
    ToggleWishlistButton,
    CommonModule,
    MatIcon,
    MenuBar,
    Carousel,
    SearchBar,
    LoadMoreProducts,
    SkeletonProductCard,
    SkeletonComponent,
    PopularProducts,
    TopSellingProducts,
],
  templateUrl: './products-grid.html',
  styleUrl: './products-grid.scss',
})
export class ProductsGrid {
  selectedCategory = input<string>('all');
  store = inject(EcommerceStore);
  mySlides: any[];
  route = inject(ActivatedRoute);
  timer: any = true;

  constructor() {
    this.route.paramMap.subscribe((params) => {
      const category = params.get('selectedCategory') ?? 'all';
      this.store.setCategory(category);
      this.store.setProductsListSeoTags(this.selectedCategory);
    });

    this.mySlides = [
      {
        link: 'https://www.google.com/',
        image:
          'https://cdn.sanity.io/images/ge071mlp/production/026ea48ab32640bbebf949d12532d37d75b37e68-2861x982.webp',
        title: 'Fresh',
        subtitle: 'Up to 50% Off',
      },
      {
        link: 'https://www.google.com/',
        image:
          'https://cdn.sanity.io/images/ge071mlp/production/5bc020192e25207ae66165e4d2501b85b43c5340-2862x982.jpg',
        title: 'Fresh',
        subtitle: 'Up to 50% Off',
      },
      {
        link: 'https://www.google.com/',
        image:
          'https://cdn.sanity.io/images/ge071mlp/production/a8b4381ad4df433a0ad5006d0dd0bb1136b8a9c2-1280x438.gif',
        title: 'Cake',
        subtitle: 'Up to 50% Off',
      },
      {
        link: 'https://www.google.com/',
        image:
          'https://cdn.sanity.io/images/ge071mlp/production/aee9ad853be7f090e494dbbc94b83a60bdfbbeab-2862x982.jpg',
        title: 'Pizzas',
        subtitle: 'Up to 50% Off',
      },
      {
        link: 'https://www.google.com/',
        image:
          'https://cdn.sanity.io/images/ge071mlp/production/338b067ba0639904c36c9a2a11b9c006f1b472eb-2862x982.webp',
        title: 'Burgers',
        subtitle: 'Up to 50% Off',
      },
    ];
  }
  

  onCategoryChange(category: string) {
    this.store.setCategory(category); // updates store immediately
  }

  carouselConfig: CarouselConfig = {
    autoPlay: true,
    interval: 3000,
    animation: 'slide',
    showIndicators: true,
    showControls: true,
  };

  isMobileView() {
    return window.innerWidth < 768; // Example breakpoint for mobile view
  }
}
