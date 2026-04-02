import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { EcommerceStore } from '../../ecommerce-store';
import { MatBadgeModule } from '@angular/material/badge';
import {
  MatMenuItem,
  MatMenuModule,
  MatMenuTrigger,
} from '@angular/material/menu';
import { MatDivider } from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';
import { SignInDialog } from '../../components/sign-in-dialog/sign-in-dialog';
import { SignUpDialog } from '../../components/sign-up-dialog/sign-up-dialog';
import { ThemeService } from '../../services/theme-mode';

@Component({
  selector: 'app-header-actions',
  imports: [
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatBadgeModule,
    MatMenuModule,
    MatMenuItem,
    MatMenuTrigger,
    MatDivider,
  ],
  templateUrl: './header-actions.html',
  styleUrl: './header-actions.scss',
})
export class HeaderActions {
  store = inject(EcommerceStore);
  themeService = inject(ThemeService);
  matDialog = inject(MatDialog);
  isDark = false;

  
  openSignInDialog() {
    this.matDialog.open(SignInDialog, {
      disableClose: true,
      data: { checkout: false },
    });
  }


  openSignUpDialog() {
    this.matDialog.open(SignUpDialog, {
      disableClose: true,
      data: { checkout: false },
    });
  }


toggleTheme() {
  this.themeService.toggleTheme();
  this.isDark = this.themeService.isDark;
}



}
