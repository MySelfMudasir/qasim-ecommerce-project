import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  isDark = false;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', e => {
          const systemPrefersDark = e.matches;

          if (!localStorage.getItem('theme')) {
            this.isDark = systemPrefersDark;
            this.applyTheme();
          }
        });
    }
  }

  toggleTheme() {
    if (!this.isBrowser) return;

    this.isDark = !this.isDark;
    this.applyTheme();
    localStorage.setItem('theme', this.isDark ? 'dark-theme' : 'light-theme');
  }

  initTheme() {
    if (!this.isBrowser) return;

    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
      this.isDark = savedTheme === 'dark-theme';
    } else {
      this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    this.applyTheme();
  }

  public applyTheme() {
    if (!this.isBrowser) return;

    const body = document.body;
    body.classList.remove('light-theme', 'dark-theme');
    body.classList.add(this.isDark ? 'dark-theme' : 'light-theme');
  }
}