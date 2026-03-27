import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import { ViewPanel } from '../../directives/view-panel';
import { MatRippleModule } from '@angular/material/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { SearchService } from '../../services/search';
@Component({
  selector: 'app-search-bar',
  imports: [
    MatButton,
    MatIcon,
    MatInputModule,
    MatRippleModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    ViewPanel,
  ],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
})
export class SearchBar {
  searchSservice = inject(SearchService);
  fb = inject(FormBuilder);

  searchForm = this.fb.group({
    searchInput: ['', [Validators.required]],
  });

  searchQuery() {
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }
    this.searchSservice.open();
  }
  
  clearSearch() {
    this.searchSservice.close();
    this.searchForm.reset();
  }
}
