import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [MatExpansionModule, MatIconModule, RouterLink, CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  readonly currentYear = new Date().getFullYear();

  readonly categories = [
    'FLOUR BATTER & BREADING',
    'CHEESE',
    'PIZZA TOPPING',
    'VEGETABLES Oil & FAT',
    'DONNER KEBAB',
    'CHICKEN DONNER',
    'CHICKEN PRODUCTS',
  ];

  readonly chipsAndPotatoes = [
    'FISH PRODUCTS',
    'SAUCES & MAYONNAISE',
    'PACKAGING',
    'SAUSAGES & SAVELOYS',
    'BUNS & PITTA BREAD',
    'HMC PRODUCTS',
  ];

  readonly drinks = [
    'CHIPS, FRIES AND POTATO PRODUCTS',
    'CLEANING MATERIALS',
    'CANS FOOD',
    'SPICES',
    'SOFT DRINKS',
  ];

  readonly companyInfo = [
    'About',
    'Membership & Services',
    'Deliveries',
    'Store Locator',
    'FAQs',
    'Privacy Policy',
  ];

  readonly purchasing = [
    'QSR & Takeaways',
    'Wholesale',
    'Franchises',
    'Custom Label Packaging',
    'Retail',
    'Click & Collect',
    'Khyber Wallet',
  ];
}
