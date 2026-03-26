import { Component, computed, effect, inject, input, signal, ViewChild } from '@angular/core';
import { ProductModel } from '../../models/product';
import { ProductCard } from "../../components/product-card/product-card";
import {MatSidenav, MatSidenavContainer, MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { EcommerceStore } from '../../ecommerce-store';
import { MatIcon } from '@angular/material/icon';
import { ToggleWishlistButton } from '../../components/toggle-wishlist-button/toggle-wishlist-button';
import { MatButton } from '@angular/material/button';
import { SidenavService } from '../../services/sidenav';

@Component({
  selector: 'app-products-grid',
  imports: [ProductCard, ToggleWishlistButton, MatSidenavModule, MatSidenav, MatSidenavContainer, MatListModule, RouterLink, CommonModule, MatIcon, MatButton],
  templateUrl: './products-grid.html',
  styleUrl: './products-grid.scss',
})
export class ProductsGrid {
  selectedCategory = input<string>('all');

  categoriesList = signal<string[]>(['all', 'Electronics', 'Furniture', 'stationery', 'sportswear', 'Kitchenware', 'Outdoor', 'home', 'Musical', 'Gardening']);

  store = inject(EcommerceStore);
  sidenavService = inject(SidenavService);

  constructor() {
    this.store.setCategory(this.selectedCategory);
  }



}
