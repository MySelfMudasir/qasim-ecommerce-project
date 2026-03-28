import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { ViewPanel } from './directives/view-panel';
import { EcommerceStore } from './ecommerce-store';
import { PreLoader } from './shared/pre-loader/pre-loader';
import { Title } from '@angular/platform-browser';
import { AppTitleService } from './services/app-title-strategy';

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

  constructor() {
    setInterval(() => {
      this.store.setPreLoader(false);
    }, 1000);
  }
  
}
