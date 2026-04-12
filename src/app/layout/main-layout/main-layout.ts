import { Component, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterOutlet, RouterLink } from '@angular/router';
import { EcommerceStore } from '../../ecommerce-store';
import { SidenavService } from '../../services/sidenav';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatListModule,
    RouterOutlet,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './main-layout.html',
})
export class MainLayout {
  store = inject(EcommerceStore);
  sidenavService = inject(SidenavService);
}