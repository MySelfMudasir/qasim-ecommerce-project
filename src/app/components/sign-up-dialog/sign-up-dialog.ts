import { Component, inject, signal, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EcommerceStore } from '../../ecommerce-store';
import { SignInDialog } from '../sign-in-dialog/sign-in-dialog';
import { SignInParams } from '../../models/user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-up-dialog',
  imports: [
    MatButtonModule,
    MatIcon,
    MatDialogClose,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatPrefix,
    MatSuffix,
  ],
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
      data: { checkout: this.router.url === '/cart' ? true : false, redirectUrl: this.data.redirectUrl },
    });
  }
}
