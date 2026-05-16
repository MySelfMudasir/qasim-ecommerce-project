import { Component, inject } from '@angular/core';
import { HeaderActions } from '../header-actions/header-actions';
import { SidenavService } from '../../services/sidenav';
import { SearchLoadingService } from '../../services/search-loading';
import { SharedModule } from '../../modules/shared';

@Component({
  selector: 'app-header',
  imports: [SharedModule, HeaderActions],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  sidenavService = inject(SidenavService);
  searchLoadingService = inject(SearchLoadingService);
  showProgressBar = true;
}
