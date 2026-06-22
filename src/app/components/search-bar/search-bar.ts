import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { SearchLoadingService } from '../../services/search-loading';
import { EcommerceStore } from '../../ecommerce-store';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from '../../modules/shared';

@Component({
  selector: 'app-search-bar',
  imports: [SharedModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
})
export class SearchBar {
  searchLoadingService = inject(SearchLoadingService);
  store = inject(EcommerceStore);
  router = inject(Router);
  route = inject(ActivatedRoute);

  searchValue = signal<string>('');
  private searchSubject = new Subject<string>();

  ngOnInit() {
    // Get search value from URL query params
    this.route.queryParams.subscribe((params) => {
      const query = params['query']?.toLowerCase().trim() || '';
      this.searchValue.set(query);
    });

    this.searchSubject
      .pipe(debounceTime(800), distinctUntilChanged())
      .subscribe((value: string) => {
        const trimmed = value.trim().toLowerCase();
        if (trimmed) {
          this.router.navigate(['/search'], { queryParams: { query: trimmed } });
        } else {
          this.store.setSearchTerm('');
          this.router.navigate(['/products/all']);
        }
        // DO NOT call setSearchTerm here — SearchResults handles it via queryParams
      });
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchLoadingService.open();
    this.searchValue.set(value);
    this.searchSubject.next(value.trim().toLowerCase());
  }

  clearSearch() {
    this.searchValue.set('');
    this.searchSubject.next('');
    // setSearchTerm('') is handled in the subscription above when trimmed is empty
  }
}
