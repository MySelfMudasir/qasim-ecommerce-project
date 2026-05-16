import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PwaInstallService } from '../../services/pwa-install.service';
import { MatButton, MatButtonModule } from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import { SharedModule } from '../../modules/shared';

@Component({
  selector: 'app-footer',
  imports: [SharedModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  readonly currentYear = new Date().getFullYear();
  pwaInstall = inject(PwaInstallService);

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
