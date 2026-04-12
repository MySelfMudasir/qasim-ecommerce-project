import { Component, inject, signal, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogClose,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatFormFieldModule,
  MatPrefix,
  MatSuffix,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EcommerceStore } from '../../ecommerce-store';
import { SignUpDialog } from '../sign-up-dialog/sign-up-dialog';
import { SignInParams } from '../../models/user';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-in-dialog',
  imports: [
    MatButtonModule,
    MatIcon,
    MatDialogClose,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatPrefix,
    MatSuffix,
    RouterLink
],
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
      checkout: this.router.url === '/cart' ? true : false,
      redirectUrl: this.data.redirectUrl,
      dialogId: this.dialogRef.id,
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
