import { Component, inject, signal, computed, HostListener, PLATFORM_ID, OnInit, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SearchBar } from '../../components/search-bar/search-bar';
import { ProductCard } from '../../components/product-card/product-card';
import { SkeletonProductCard } from '../../shared/skeletons/skeleton-product-card';
import { EcommerceStore } from '../../ecommerce-store';
import { SearchLoadingService } from '../../services/search-loading';
import { ToggleWishlistButton } from '../../components/toggle-wishlist-button/toggle-wishlist-button';
import { FilterSidebar, FilterOptions } from '../../components/filter-sidebar/filter-sidebar';
import { LoadMoreProducts } from '../../components/load-more-products/load-more-products';
import { A11yModule } from '@angular/cdk/a11y';

@Component({
  selector: 'app-search-results',
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    SearchBar,
    ProductCard,
    SkeletonProductCard,
    ToggleWishlistButton,
    FilterSidebar,
    LoadMoreProducts,
    A11yModule,
  ],
  templateUrl: './search-results.html',
  styleUrl: './search-results.scss',
})
export class SearchResults implements OnInit {
  store = inject(EcommerceStore);
  searchLoadingService = inject(SearchLoadingService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  platformId = inject(PLATFORM_ID);
  breakpointObserver = inject(BreakpointObserver);

  searchQuery = signal<string>('');
  filters = signal<FilterOptions>({});
  private _sidebarOpen = signal<boolean>(false);
  private _isMobile = signal<boolean>(false);
  private searchLoadingTimer?: ReturnType<typeof setTimeout>;

  @ViewChild('sidenav') sidenav!: MatSidenav;

  sidebarOpen = this._sidebarOpen.asReadonly();
  isMobile = this._isMobile.asReadonly();

  sidebarMode = computed(() => {
    return this._isMobile() ? 'over' : 'side';
  });

  sidebarOpened = computed(() => {
    return this._sidebarOpen();
  });

  ngOnInit() {
    // Observe breakpoints for responsive sidebar
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this._isMobile.set(result.matches);

      // Default state follows the active layout: open on desktop, closed on mobile
      this._sidebarOpen.set(!result.matches);
    });

    // Get search query from URL
    this.route.queryParams.subscribe(params => {
      const query = params['query']?.toLowerCase().trim() || '';
      this.searchQuery.set(query);
      if (query) {
        this.store.setSearchTerm(query);
        this.store.setShowOutOfStock(true);
      }
    });
  }

  onFilterChange(newFilters: FilterOptions) {
    this.searchLoadingService.open();
    if (this.searchLoadingTimer) {
      clearTimeout(this.searchLoadingTimer);
    }

    this.filters.set(newFilters);
    
    // Update store with new filters
    this.store.setSelectedBrands(newFilters.brand || []);
    this.store.setSelectedCategories(newFilters.categories || []);
    this.store.setPriceRange(newFilters.priceRange || [0, 500]);
    this.store.setSelectedStorageTypes(newFilters.storageType || []);
    this.store.setSelectedSizes(newFilters.size || []);
    this.store.setSelectedFeatures(newFilters.featured || []);
    this.store.setSelectedSort(newFilters.sortBy || 'relevance');
    this.store.setShowOutOfStock(newFilters.showOutOfStock || false);

    this.searchLoadingTimer = setTimeout(() => {
      this.searchLoadingService.close();
    }, 500);
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const scrollPosition = window.innerHeight + window.scrollY;
    const pageHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= pageHeight - 300 && !this.store.isLoadingMore() && this.store.filteredProducts().length > 0) {
      this.store.loadMoreProducts();
    }
  }

  toggleSidebar() {
    if (this.sidenav) {
      this.sidenav.toggle();
    } else {
      this._sidebarOpen.update(v => !v);
    }
  }

  onSidenavOpenedChange(opened: boolean) {
    this._sidebarOpen.set(opened);
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
