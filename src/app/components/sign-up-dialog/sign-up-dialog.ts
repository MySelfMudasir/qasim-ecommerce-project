import { Component, inject, signal, Signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EcommerceStore } from '../../ecommerce-store';
import { SignInDialog } from '../sign-in-dialog/sign-in-dialog';
import { SignInParams } from '../../models/user';
import { Router } from '@angular/router';
import { SharedModule } from '../../modules/shared';
@Component({
  selector: 'app-sign-up-dialog',
  imports: [SharedModule],
  templateUrl: './sign-up-dialog.html',
  styleUrl: './sign-up-dialog.scss',
})
export class SignUpDialog {
  store = inject(EcommerceStore);
  router = inject(Router);
  fb = inject(NonNullableFormBuilder);
  matDialog = inject(MatDialog);
  data = inject<{ checkout?: boolean; redirectUrl?: string }>(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef);
  passwordVisible = signal(false);
  confirmPasswordVisible = signal(false);

  signUpForm = this.fb.group({
    name: ['Test User', Validators.required],
    email: ['test@gmail.com', Validators.required],
    password: ['Mail@20262026', Validators.required],
    confirmPassword: ['Mail@20262026', Validators.required],
  });

  signUp() {
    if (!this.signUpForm.valid) {
      this.signUpForm.markAllAsTouched();
      return;
    }
    const { email, password } = this.signUpForm.value;
    // console.log('Signing up with', { email, password });
    this.store.signUp({
      email,
      password,
      checkout: this.router.url === '/cart' ? true : false,
      redirectUrl: this.data.redirectUrl,
      dialogId: this.dialogRef.id,
    } as SignInParams);
  }

  openSignInDialog() {
    this.dialogRef.close();
    this.matDialog.open(SignInDialog, {
      disableClose: true,
      data: {
        checkout: this.router.url === '/cart' ? true : false,
        redirectUrl: this.data.redirectUrl,
      },
    });
  }
}
