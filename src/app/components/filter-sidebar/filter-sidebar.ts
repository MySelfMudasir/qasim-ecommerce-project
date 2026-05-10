import { Component, effect, inject, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EcommerceStore } from '../../ecommerce-store';

export interface FilterOptions {
  featured?: string[];
  sortBy?: string;
  categories?: string[];
  brand?: string[];
  priceRange?: [number, number];
  storageType?: string[];
  size?: string[];
  showOutOfStock?: boolean;
}

@Component({
  selector: 'app-filter-sidebar',
  imports: [
    CommonModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatSliderModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './filter-sidebar.html',
  styleUrl: './filter-sidebar.scss',
})
export class FilterSidebar {
  store = inject(EcommerceStore);

  filterChange = output<FilterOptions>();
  activeFilters = input<FilterOptions>({});

  private readonly defaultFilters: FilterOptions = {
    featured: [],
    categories: [],
    brand: [],
    priceRange: [0, 500],
    storageType: [],
    size: [],
    showOutOfStock: true,
    sortBy: 'relevance',
  };

  expandedPanels = signal<{ [key: string]: boolean }>({
    featured: true,
    sortBy: false,
    categories: false,
    brand: false,
    priceRange: false,
    storageType: false,
    size: false,
  });

  filters: FilterOptions = {
    ...this.defaultFilters,
  };

  private readonly syncActiveFilters = effect(() => {
    const active = this.activeFilters();
    this.filters = this.normalizeFilters(active);
  });

  featuredOptions = [
    { label: 'Monthly Promotions', value: 'monthly-promos' },
    { label: 'Reduced To Clear', value: 'reduced' },
    { label: 'New Arrivals', value: 'new-arrivals', count: 2 },
  ];

  sortOptions = [
    { label: 'Relevance', value: 'relevance' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Rating', value: 'rating' },
    { label: 'Newest', value: 'newest' },
  ];

  brandOptions = [
    { label: 'Swift', value: 'swift' },
    { label: 'Habibi', value: 'habibi' },
    { label: 'Premium', value: 'premium' },
  ];

  storageTypeOptions = [
    { label: 'Chilled', value: 'chilled' },
    { label: 'Frozen', value: 'frozen' },
    { label: 'Ambient', value: 'ambient' },
  ];

  sizeOptions = [
    { label: 'Small', value: 'small' },
    { label: 'Medium', value: 'medium' },
    { label: 'Large', value: 'large' },
    { label: 'Extra Large', value: 'xl' },
  ];

  togglePanel(panelName: string) {
    this.expandedPanels.update((panels) => ({
      ...panels,
      [panelName]: !panels[panelName],
    }));
  }

  onFeaturedChange(value: string, checked: boolean) {
    this.toggleArrayFilter('featured', value, checked);
  }

  onSortChange(value: string) {
    this.filters = {
      ...this.filters,
      sortBy: value,
    };
    this.emitChanges();
  }

  onCategoryChange(category: string, checked: boolean) {
    this.toggleArrayFilter('categories', category, checked);
  }

  onBrandChange(brand: string, checked: boolean) {
    this.toggleArrayFilter('brand', brand, checked);
  }

  onStorageTypeChange(type: string, checked: boolean) {
    this.toggleArrayFilter('storageType', type, checked);
  }

  onSizeChange(size: string, checked: boolean) {
    this.toggleArrayFilter('size', size, checked);
  }

  onPriceMinChange(value: number | null) {
    const [currentMin = 0, currentMax = 500] = this.filters.priceRange ?? [0, 500];
    this.filters = {
      ...this.filters,
      priceRange: [Math.min(Number(value ?? currentMin), currentMax), currentMax],
    };
    this.emitChanges();
  }

  onPriceMaxChange(value: number | null) {
    const [currentMin = 0, currentMax = 500] = this.filters.priceRange ?? [0, 500];
    this.filters = {
      ...this.filters,
      priceRange: [currentMin, Math.max(Number(value ?? currentMax), currentMin)],
    };
    this.emitChanges();
  }

  onShowOutOfStockChange(checked: boolean) {
    this.filters = {
      ...this.filters,
      showOutOfStock: checked,
    };
    this.emitChanges();
  }

  clearFilters() {
    this.filters = this.normalizeFilters();
    this.emitChanges();
  }

  private emitChanges() {
    this.filterChange.emit(this.normalizeFilters(this.filters));
  }

  private toggleArrayFilter(
    field: 'featured' | 'categories' | 'brand' | 'storageType' | 'size',
    value: string,
    checked: boolean,
  ) {
    const current = new Set(this.filters[field] ?? []);

    if (checked) {
      current.add(value);
    } else {
      current.delete(value);
    }

    this.filters = {
      ...this.filters,
      [field]: [...current],
    };

    this.emitChanges();
  }

  private normalizeFilters(filters: FilterOptions = {}): FilterOptions {
    return {
      ...this.defaultFilters,
      ...filters,
      featured: [...(filters.featured ?? [])],
      categories: [...(filters.categories ?? [])],
      brand: [...(filters.brand ?? [])],
      priceRange: [...(filters.priceRange ?? this.defaultFilters.priceRange!)] as [number, number],
      storageType: [...(filters.storageType ?? [])],
      size: [...(filters.size ?? [])],
      showOutOfStock: filters.showOutOfStock ?? this.defaultFilters.showOutOfStock,
      sortBy: filters.sortBy ?? this.defaultFilters.sortBy,
    };
  }

  isFeaturedChecked(value: string): boolean {
    return this.filters.featured?.includes(value) ?? false;
  }

  isCategoryChecked(category: string): boolean {
    return this.filters.categories?.includes(category) ?? false;
  }

  isBrandChecked(brand: string): boolean {
    return this.filters.brand?.includes(brand) ?? false;
  }

  isStorageTypeChecked(type: string): boolean {
    return this.filters.storageType?.includes(type) ?? false;
  }

  isSizeChecked(size: string): boolean {
    return this.filters.size?.includes(size) ?? false;
  }

  formatPrice(value: number): string {
    return `$${value}`;
  }
}
