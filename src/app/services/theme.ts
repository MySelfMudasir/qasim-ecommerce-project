import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  isDark = false;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    // Listen to system theme changes
    if (this.isBrowser) {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (e) => {
          if (!localStorage.getItem('theme')) {
            this.isDark = e.matches;
            this.applyTheme();
          }
        });
    }
  }

  toggleTheme() {
    if (!this.isBrowser) return;

    this.isDark = !this.isDark;

    localStorage.setItem(
      'theme',
      this.isDark ? 'dark-theme' : 'light-theme'
    );

    this.applyTheme();
  }

  initTheme() {
    if (!this.isBrowser) return;

    const savedTheme = localStorage.getItem('theme');

    this.isDark = savedTheme
      ? savedTheme === 'dark-theme'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;

    // ✅ APPLY EARLY (fix SSR flicker)
    const el = document.documentElement;
    el.classList.add(this.isDark ? 'dark-theme' : 'light-theme');
  }

  public applyTheme() {
    if (!this.isBrowser) return;

    const el = document.documentElement;

    // remove old classes
    el.classList.remove('light-theme', 'dark-theme');

    // ✅ FORCE REPAINT (fix half-dark bug)
    void el.offsetHeight;

    // add new class
    el.classList.add(this.isDark ? 'dark-theme' : 'light-theme');
  }
}