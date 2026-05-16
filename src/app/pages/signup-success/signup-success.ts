import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SignInDialog } from '../../components/sign-in-dialog/sign-in-dialog';
import { SharedModule } from '../../modules/shared';

@Component({
  selector: 'app-signup-success',
  imports: [SharedModule],
  templateUrl: './signup-success.html',
  styleUrl: './signup-success.scss',
})
export class SignupSuccess {
  router = inject(Router);
  matDialog = inject(MatDialog);

  openSignInDialog() {
    this.matDialog.open(SignInDialog, {
      disableClose: true,
      data: { redirectUrl: this.router.url },
    });
  }
}
