import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [MatExpansionModule, MatIconModule, RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {

  readonly currentYear = new Date().getFullYear();

  readonly categoryColumns = [
    ['FLOUR BATTER & BREADING', 'CHEESE', 'PIZZA TOPPING', 'VEGETABLES Oil & FAT', 'DONNER KEBAB'],
    [
      'CHICKEN DONNER',
      'CHICKEN PRODUCTS',
      'FISH PRODUCTS',
      'SAUCES & MAYONNAISE',
      'FRIES AND POTATO PRODUCTS',
    ],
    [
      'PACKAGING',
      'SAUSAGES & SAVELOYS',
      'BUNS & PITTA BREAD',
      'HMC PRODUCTS',
      'CHIPS, SNACKS & NUTS',
    ],
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
  ];
}
