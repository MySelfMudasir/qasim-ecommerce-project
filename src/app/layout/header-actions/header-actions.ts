import { Component, inject } from '@angular/core';
import { Router} from '@angular/router';
import { EcommerceStore } from '../../ecommerce-store';
import { MatDialog, MatDialogClose } from '@angular/material/dialog';
import { SignInDialog } from '../../components/sign-in-dialog/sign-in-dialog';
import { SignUpDialog } from '../../components/sign-up-dialog/sign-up-dialog';
import { ThemeService } from '../../services/theme';
import { ThemeButton } from '../../components/theme-button/theme-button';
import { SharedModule } from '../../modules/shared';

@Component({
  selector: 'app-header-actions',
  imports: [
    ThemeButton,
    SharedModule
],
  templateUrl: './header-actions.html',
  styleUrl: './header-actions.scss',
})
export class HeaderActions {
  store = inject(EcommerceStore);
  router = inject(Router);
  themeService = inject(ThemeService);
  matDialog = inject(MatDialog);

  toggle() {
    this.store.setIsSkeletonLoading(!this.store.isSkeletonLoading());
  }

  openSignInDialog() {
    this.matDialog.open(SignInDialog, {
      disableClose: true,
      data: { redirectUrl: this.router.url },
    });
  }

  openSignUpDialog() {
    this.matDialog.open(SignUpDialog, {
      disableClose: true,
      data: { redirectUrl: this.router.url },
    });
  }
}
