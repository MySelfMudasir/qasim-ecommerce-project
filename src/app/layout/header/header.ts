import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderActions } from '../header-actions/header-actions';
import { MatIcon } from '@angular/material/icon';
import { SidenavService } from '../../services/sidenav';
import { MatButton } from '@angular/material/button';
import { RouterLink } from "@angular/router";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { SearchLoadingService } from '../../services/search-loading';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, HeaderActions, MatIcon, MatButton, RouterLink, MatProgressBarModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  sidenavService = inject(SidenavService);
  searchLoadingService = inject(SearchLoadingService);
  showProgressBar = true;
}
