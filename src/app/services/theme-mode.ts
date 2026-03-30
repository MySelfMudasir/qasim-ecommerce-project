import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeModeService {
  isDark = false;


  constructor() {
    // Listen for OS-level theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      const systemPrefersDark = e.matches;
      // console.log('OS theme changed. Now prefers dark?', systemPrefersDark);

      // Only change theme if user hasn't set a preference in localStorage
      if (!localStorage.getItem('theme')) {
        this.isDark = systemPrefersDark;
        this.applyTheme();
      }
    });
  }


  toggleTheme() {
    this.isDark = !this.isDark;
    this.applyTheme(); // safe, still inside the class
    localStorage.setItem('theme', this.isDark ? 'dark-theme' : 'light-theme');
  }




  initTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      this.isDark = savedTheme === 'dark-theme';
    } else {
      this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    this.applyTheme(); // now it's public, can be called from App
  }




  // ✅ Change from private to public
  public applyTheme() {
    const body = document.body;
    body.classList.remove('light-theme', 'dark-theme');
    body.classList.add(this.isDark ? 'dark-theme' : 'light-theme');
    // console.log('Current theme:', this.isDark ? 'dark' : 'light');
  }





}
