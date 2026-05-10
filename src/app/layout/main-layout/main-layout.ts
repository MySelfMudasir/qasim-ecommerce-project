import { Component, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { EcommerceStore } from '../../ecommerce-store';
import { SidenavService } from '../../services/sidenav';
import { CommonModule } from '@angular/common';
import { Footer } from "../footer/footer";
import { computed } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatListModule,
    RouterOutlet,
    CommonModule,
    RouterLink,
    Footer
],
  templateUrl: './main-layout.html',
})
export class MainLayout {
  store = inject(EcommerceStore);
  sidenavService = inject(SidenavService);
  router = inject(Router);

  // Hide sidebar on search route
  showSidebar = computed(() => {
    return !this.router.url.includes('/search');
  });
}