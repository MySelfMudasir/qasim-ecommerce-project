import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { ViewPanel } from './directives/view-panel';
import { EcommerceStore } from './ecommerce-store';
import { PreLoader } from './shared/pre-loader/pre-loader';
import { AppTitleService } from './services/app-title-strategy';
import { ThemeModeService } from './services/theme-mode';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, ViewPanel, PreLoader],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  titleService = inject(AppTitleService);
  protected readonly title = signal('ecommerce');
  store = inject(EcommerceStore);
  themeService = inject(ThemeModeService);
  isDark = false;

  constructor() {
    setInterval(() => {
      this.store.setPreLoader(false);
    }, 1000);
  }

  ngOnInit() {
    this.themeService.initTheme(); // set theme from localStorage or OS    
  }
}
