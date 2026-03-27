import { Component, computed, effect, inject, input, signal, ViewChild } from '@angular/core';
import { ProductModel } from '../../models/product';
import { ProductCard } from '../../components/product-card/product-card';
import { MatSidenav, MatSidenavContainer, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EcommerceStore } from '../../ecommerce-store';
import { MatIcon } from '@angular/material/icon';
import { ToggleWishlistButton } from '../../components/toggle-wishlist-button/toggle-wishlist-button';
import { MatButton } from '@angular/material/button';
import { SidenavService } from '../../services/sidenav';
import { ViewPanel } from '../../directives/view-panel';
import { Carousel, CarouselConfig } from '../../components/carousel/carousel';
import { Carousel2 } from '../../components/carousel2/carousel2';
import { MenuBar } from "../../components/menu-bar/menu-bar";

@Component({
  selector: 'app-products-grid',
  imports: [
    ProductCard,
    ToggleWishlistButton,
    MatSidenavModule,
    MatSidenav,
    MatSidenavContainer,
    MatListModule,
    RouterLink,
    CommonModule,
    Carousel2,
    MatIcon,
    MatButton,
    MenuBar,
    ViewPanel,
    Carousel,
    MenuBar
],
  templateUrl: './products-grid.html',
  styleUrl: './products-grid.scss',
})
export class ProductsGrid {
  selectedCategory = input<string>('all');

  categoriesList = signal<string[]>([
    'all',
    'Electronics',
    'Furniture',
    'stationery',
    'sportswear',
    'Kitchenware',
    'Outdoor',
    'home',
    'Musical',
    'Gardening',
  ]);

  store = inject(EcommerceStore);
  sidenavService = inject(SidenavService);
  mySlides: any[];
  constructor() {
    this.store.setCategory(this.selectedCategory);
    this.mySlides = [
      {
        image:
          'https://cdn.sanity.io/images/ge071mlp/production/5bc020192e25207ae66165e4d2501b85b43c5340-2862x982.jpg',
        title: 'Fresh',
        subtitle: 'Up to 50% Off',
      },
      {
        image:
          'https://cdn.sanity.io/images/ge071mlp/production/a8b4381ad4df433a0ad5006d0dd0bb1136b8a9c2-1280x438.gif',
        title: 'Cake',
        subtitle: 'Up to 50% Off',
      },
      {
        image:
          'https://cdn.sanity.io/images/ge071mlp/production/aee9ad853be7f090e494dbbc94b83a60bdfbbeab-2862x982.jpg',
        title: 'Pizzas',
        subtitle: 'Up to 50% Off',
      },
      {
        image:
          'https://cdn.sanity.io/images/ge071mlp/production/338b067ba0639904c36c9a2a11b9c006f1b472eb-2862x982.webp',
        title: 'Burgers',
        subtitle: 'Up to 50% Off',
      },
    ];
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
