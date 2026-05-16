import { Component, inject, input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcommerceStore } from '../../ecommerce-store';
import { ProductCard } from '../../components/product-card/product-card';
import { ToggleWishlistButton } from '../../components/toggle-wishlist-button/toggle-wishlist-button';
import { Carousel, CarouselConfig } from '../../components/carousel/carousel';
import { MenuBar } from '../../components/menu-bar/menu-bar';
import { SearchBar } from '../../components/search-bar/search-bar';
import { LoadMoreProducts } from '../../components/load-more-products/load-more-products';
import { SkeletonProductCard } from '../../shared/skeletons/skeleton-product-card';
import { PopularProducts } from '../../components/popular-products/popular-products';
import { TopSellingProducts } from '../../components/top-selling-products/top-selling-products';
import { SkeletonComponent } from 'boneyard-js/angular';
import { AdvertisementBanner } from '../../components/advertisement-banner/advertisement-banner';
import { ViewPanel } from '../../directives/view-panel';
import { SharedModule } from '../../modules/shared';

@Component({
  selector: 'app-products-grid',
  imports: [
    ProductCard,
    ToggleWishlistButton,
    SharedModule,
    MenuBar,
    Carousel,
    SearchBar,
    LoadMoreProducts,
    SkeletonProductCard,
    SkeletonComponent,
    PopularProducts,
    TopSellingProducts,
    AdvertisementBanner,
    ViewPanel,
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
        url: 'https://www.google.com/',
        mobileImage:
          'https://cdn.sanity.io/images/ge071mlp/production/0b909d9e77b6e038ae54df5b14388d6959b143c8-1201x901.webp',
        desktopImage:
          'https://cdn.sanity.io/images/ge071mlp/production/026ea48ab32640bbebf949d12532d37d75b37e68-2861x982.webp',
        title: 'Fresh',
        subtitle: 'Up to 50% Off',
      },
      {
        url: 'https://www.google.com/',
        mobileImage:
          'https://cdn.sanity.io/images/ge071mlp/production/41a8c754062e19a5a5680c5ebc5f0db19475b71d-1200x900.jpg',
        desktopImage:
          'https://cdn.sanity.io/images/ge071mlp/production/03eda4127d665536a0ca2536a2f7874d387bc154-3520x1216.jpg',
        title: 'Fresh',
        subtitle: 'Up to 50% Off',
      },
      {
        url: 'https://www.google.com/',
        mobileImage:
          'https://cdn.sanity.io/images/ge071mlp/production/44232b80e84867d6f18ef40d23a9eb4132972839-1201x901.webp',
        desktopImage:
          'https://cdn.sanity.io/images/ge071mlp/production/77e238871783ed0a557d16cfc3fece2468dafba0-2861x982.webp',
        title: 'Cake',
        subtitle: 'Up to 50% Off',
      },
      {
        url: 'https://www.google.com/',
        mobileImage:
          'https://cdn.sanity.io/images/ge071mlp/production/99733031fa94a9f307e04e26d6f2d06827b158d2-1201x901.webp',
        desktopImage:
          'https://cdn.sanity.io/images/ge071mlp/production/1d00a59961e0525625374a44beb150a71876ee51-2861x950.webp',
        title: 'Pizzas',
        subtitle: 'Up to 50% Off',
      },
      {
        url: 'https://www.google.com/',
        mobileImage:
          'https://cdn.sanity.io/images/ge071mlp/production/de19d7fb711e034a361bd9391300b550fe6c95b8-800x597.gif',
        desktopImage:
          'https://cdn.sanity.io/images/ge071mlp/production/3e365f4b53b9c49327abc291f03043a6fb05a970-1280x439.gif',
        title: 'Burgers',
        subtitle: 'Up to 50% Off',
      },
      {
        url: 'https://www.google.com/',
        mobileImage:
          'https://cdn.sanity.io/images/ge071mlp/production/a184564aa64fe1db483c39c3e93cbb6fb368ed2d-1201x901.webp',
        desktopImage:
          'https://cdn.sanity.io/images/ge071mlp/production/9b0cf1fe84726923dff7f80e316dff56a716d260-2862x982.webp',
        title: 'Burgers',
        subtitle: 'Up to 50% Off',
      },
    ];
  }

  onCategoryChange(category: string) {
    this.store.setCategory(category); // updates store immediately
  }

  carouselConfig: CarouselConfig = {
    autoPlay: false,
    interval: 3000,
    animation: 'slide',
    showIndicators: true,
    showControls: true,
  };

  isMobileView() {
    return window.innerWidth < 768; // Example breakpoint for mobile view
  }
}
