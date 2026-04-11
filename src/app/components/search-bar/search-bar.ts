import { Component, inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { SearchLoadingService } from '../../services/search-loading';
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-search-bar',
  imports: [MatIconButton, MatIcon, MatInputModule, MatRippleModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
})
export class SearchBar {
  searchLoadingService = inject(SearchLoadingService);
  store = inject(EcommerceStore);

  private searchSubject = new Subject<string>();

  ngOnInit() {
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value: string) => {
        const trimmed = value.trim().toLowerCase();
        this.store.setSearchTerm(trimmed);
      });
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchSubject.next(value.trim().toLowerCase());
  }

  clearSearch() {
    this.searchSubject.next(''); // reset stream
    this.store.setSearchTerm('');
    this.searchLoadingService.close();
  }
}
