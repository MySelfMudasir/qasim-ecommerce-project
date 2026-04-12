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
      useValue: {displayDefaultIndicatorType: false},
    },
  ],
})
export class MultiStepSignUp {
  private _formBuilder = inject(FormBuilder);
  passwordVisible = signal(false);

  accountFormGroup = this._formBuilder.group({
    email: ['test@gmail.com', [Validators.required, Validators.email]],
    password: ['Mail@20262026', [Validators.required, Validators.minLength(8)]],
  });
  emailFormGroup = this._formBuilder.group({
    verificationCode: ['123456', [Validators.required, Validators.minLength(6)]],
  });
  profileFormGroup = this._formBuilder.group({
    firstName: ['Jane', Validators.required],
    lastName: ['Doe', Validators.required],
    displayName: ['Jane Doe', Validators.required],
  });
  phoneFormGroup = this._formBuilder.group({
    phoneNumber: ['123-456-7890', Validators.required],
    phoneCode: ['123456', [Validators.required, Validators.minLength(6)]],
  });
  businessFormGroup = this._formBuilder.group({
    businessName: ['Test Business', Validators.required],
    businessType: ['Retail', Validators.required],
  });
  addressFormGroup = this._formBuilder.group({
    streetAddress: ['123 Main St', Validators.required],
    city: ['New York', Validators.required],
    state: ['NY', Validators.required],
    zipCode: ['10001', Validators.required],
    country: ['USA', Validators.required],
  });
  productsFormGroup = this._formBuilder.group({
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
    this.phoneFormGroup,
    this.businessFormGroup,
    this.addressFormGroup,
    this.productsFormGroup,
    this.notificationsFormGroup,
  ];

  constructor() {
    const breakpointObserver = inject(BreakpointObserver);

    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  onSubmit() {
    if (this.formGroups.every(group => group.valid)) {
      console.log('Form submitted successfully!', {
        account: this.accountFormGroup.getRawValue(),
        email: this.emailFormGroup.getRawValue(),
        profile: this.profileFormGroup.getRawValue(),
        phone: this.phoneFormGroup.getRawValue(),
        business: this.businessFormGroup.getRawValue(),
        address: this.addressFormGroup.getRawValue(),
        products: this.productsFormGroup.getRawValue(),
        notifications: this.notificationsFormGroup.getRawValue(),
      });
      return;
    }

    this.formGroups.forEach(group => group.markAllAsTouched());
  }
}
