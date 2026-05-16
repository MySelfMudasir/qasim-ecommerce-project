import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { EcommerceStore } from '../../ecommerce-store';
import { SidenavService } from '../../services/sidenav';
import { Footer } from "../footer/footer";
import { computed } from '@angular/core';
import { SharedModule } from '../../modules/shared';

@Component({
  selector: 'app-main-layout',
  imports: [
    SharedModule,
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