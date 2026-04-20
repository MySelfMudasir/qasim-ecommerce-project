import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { SignInDialog } from '../../components/sign-in-dialog/sign-in-dialog';

@Component({
  selector: 'app-signup-success',
  imports: [MatIcon, MatButton],
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
