import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation, MatStepperModule } from '@angular/material/stepper';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AsyncPipe } from '@angular/common';
import { BackButton } from '../../components/back-button/back-button';
import { ViewPanel } from '../../directives/view-panel';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SignInDialog } from '../../components/sign-in-dialog/sign-in-dialog';

@Component({
  selector: 'app-multi-step-sign-up',
  imports: [
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    ViewPanel,
    BackButton,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule,
    AsyncPipe,
  ],
  templateUrl: './multi-step-sign-up.html',
  styleUrl: './multi-step-sign-up.scss',
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class MultiStepSignUp {
  private _formBuilder = inject(FormBuilder);
  passwordVisible = signal(false);
  submitButtonDisabled = signal(false);
  router = inject(Router);

  accountFormGroup = this._formBuilder.group({
    email: ['test@gmail.com', [Validators.required, Validators.email]],
    password: ['Mail@20262026', [Validators.required, Validators.minLength(8)]],
  });
  emailFormGroup = this._formBuilder.group({
    verificationCode: ['123456', [Validators.required, Validators.minLength(6)]],
    phoneNumber: ['123-456-7890', Validators.required],
    phoneCode: ['123456'],
  });
  profileFormGroup = this._formBuilder.group({
    firstName: ['Jane', Validators.required],
    lastName: ['Doe', Validators.required],
    displayName: ['Jane Doe'],
    streetAddress: ['123 Main St', Validators.required],
    city: ['New York', Validators.required],
    state: ['NY', Validators.required],
    zipCode: ['10001', Validators.required],
    country: ['USA', Validators.required],
  });
  businessFormGroup = this._formBuilder.group({
    businessName: ['Test Business', Validators.required],
    businessType: ['Retail', Validators.required],
    primaryCategory: ['Fashion', Validators.required],
    monthlyOrders: ['100', Validators.required],
  });
  notificationsFormGroup = this._formBuilder.group({
    emailUpdates: [true],
    smsUpdates: [false],
    marketingUpdates: [false],
  });

  stepperOrientation: Observable<StepperOrientation>;

  readonly businessTypes = ['Retail', 'Wholesale', 'Services', 'Marketplace'];
  readonly productCategories = ['Fashion', 'Electronics', 'Home Goods', 'Beauty', 'Grocery'];

  readonly formGroups = [
    this.accountFormGroup,
    this.emailFormGroup,
    this.profileFormGroup,
    this.businessFormGroup,
    this.notificationsFormGroup,
  ];

  constructor() {
    const breakpointObserver = inject(BreakpointObserver);

    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));

    this.emailFormGroup.controls['phoneCode'].disable();
  }

  onSubmit() {
    if (this.formGroups.every((group) => group.valid)) {
      this.submitButtonDisabled.set(true);
      console.log('Form submitted successfully!', {
        account: this.accountFormGroup.getRawValue(),
        email: this.emailFormGroup.getRawValue(),
        profile: this.profileFormGroup.getRawValue(),
        business: this.businessFormGroup.getRawValue(),
        notifications: this.notificationsFormGroup.getRawValue(),
      });
    }
    this.router.navigate(['/signup-success']);

    this.formGroups.forEach((group) => group.markAllAsTouched());
  }






}
