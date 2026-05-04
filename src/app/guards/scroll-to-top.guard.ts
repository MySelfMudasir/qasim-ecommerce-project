import { Injectable, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ScrollToTopGuard {
  private router = inject(Router);

  constructor() {
    this.initializeScrollToTop();
  }

  private initializeScrollToTop(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        // Perform scroll immediately and at multiple intervals
        this.performScroll();
        setTimeout(() => this.performScroll(), 0);
        setTimeout(() => this.performScroll(), 100);
        setTimeout(() => this.performScroll(), 300);
        setTimeout(() => this.performScroll(), 500);
      });
  }

  private performScroll(): void {
    // Scroll main window
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.documentElement.scrollLeft = 0;
    document.body.scrollTop = 0;
    document.body.scrollLeft = 0;
    
    // Scroll Material containers and any overflow containers
    const scrollableElements = document.querySelectorAll(
      'mat-sidenav-content, [class*="scroll"], [class*="content"], [role="main"], .content, main, [style*="overflow"]'
    );
    scrollableElements.forEach((element: any) => {
      if (element && element.scrollTop !== undefined) {
        element.scrollTop = 0;
        element.scrollLeft = 0;
      }
    });
  }
}
