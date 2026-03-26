import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderActions } from '../header-actions/header-actions';
import { MatIcon } from '@angular/material/icon';
import { SidenavService } from '../../services/sidenav';
import { MatButton } from '@angular/material/button';
import { SearchBar } from '../../components/search-bar/search-bar';
import { RouterLink } from "@angular/router";
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, HeaderActions, MatIcon, MatButton, SearchBar, RouterLink, MatProgressBarModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  sidenavService = inject(SidenavService);

  toggleMenu() {
    this.sidenavService.toggle();
  }
}
