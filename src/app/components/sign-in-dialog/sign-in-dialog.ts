import { Component, inject, signal, Signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EcommerceStore } from '../../ecommerce-store';
import { SignInParams } from '../../models/user';
import { Router, RouterLink } from '@angular/router';
import { SharedModule } from '../../modules/shared';

@Component({
  selector: 'app-sign-in-dialog',
  imports: [SharedModule],
  templateUrl: './sign-in-dialog.html',
  styleUrl: './sign-in-dialog.scss',
})
export class SignInDialog {
  store = inject(EcommerceStore);
  router = inject(Router);
  fb = inject(NonNullableFormBuilder);
  matDialog = inject(MatDialog);
  data = inject<{ checkout?: boolean; redirectUrl?: string }>(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef);
  passwordVisible = signal(false);

  signInForm = this.fb.group({
    email: ['test@gmail.com', Validators.required],
    password: ['Mail@20262026', Validators.required],
  });

  signIn() {
    if (!this.signInForm.valid) {
      this.signInForm.markAllAsTouched();
      return;
    }
    const { email, password } = this.signInForm.value;
    // console.log('Signing in with', { email, password });
    this.store.signIn({
      email,
      password,
      dialogId: this.dialogRef.id,
      checkoutmode: this.store.user()?.checkoutMode ?? { mode: 'collection' },
    } as SignInParams);
  }

  openSignUpDialog() {
    this.dialogRef.close();
    // this.matDialog.open(SignUpDialog, {
    //   disableClose: true,
    //   data: { checkout: this.router.url === '/cart' ? true : false, redirectUrl: this.data.redirectUrl },
    // });

    this.router.navigate(['/multi-step-sign-up']);
  }
}
