import { Component, inject } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatRipple } from '@angular/material/core';
import { RouterLink } from '@angular/router';
import { EcommerceStore } from '../../ecommerce-store';

export interface MenuItem {
  label: string;
  children?: MenuItem[];
}

export interface MenuSection {
  title: string;
  items: MenuItem[];
}

export interface MenuGroup {
  label: string;
  type?: 'mega' | 'simple';
  sections?: MenuSection[]; // for mega menu
  items?: MenuItem[]; // for simple menu
}

@Component({
  selector: 'app-menu-bar',
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatIcon,
    A11yModule,
    CommonModule,
    MatListItem,
    MatNavList,
    RouterLink,
  ],
  templateUrl: './menu-bar.html',
  styleUrl: './menu-bar.scss',
})
export class MenuBar {
  store = inject(EcommerceStore);

  menus: MenuGroup[] = [
    {
      label: 'Shopping Categories',
      type: 'mega',
      sections: [
        {
          title: 'Baking & Breading',
          items: [
            { label: 'FLOUR BATTER & BREADING' },
            { label: 'BUNS & PITTA BREAD' },
            { label: 'BREAD CRUMBS & BAKING MIXES' },
            { label: 'BAKING INGREDIENTS' },
          ],
        },
        {
          title: 'Dairy & Toppings',
          items: [
            { label: 'Butter & Margarine' },
            { label: 'Cheese' },
            { label: 'Cream & Toppings' },
          ],
        },
        {
          title: 'Proteins',
          items: [
            { label: 'DONNER KEBAB' },
            { label: 'CHICKEN DONNER' },
            { label: 'CHICKEN PRODUCTS' },
            { label: 'FISH PRODUCTS' },
            { label: 'SAUSAGES & SAVELOYS' },
          ],
        },
      ],
    },
    {
      label: 'Grocery Items',
      items: [
        {
          label: 'Pantry Items',
          children: [
            { label: 'VEGETABLES OIL & FAT' },
            { label: 'SAUCES & MAYONNAISE' },
            { label: 'SPICES' },
            { label: 'CANS FOOD' },
          ],
        },
        {
          label: 'Sides & Snacks',
          children: [{ label: 'CHIPS, FRIES AND POTATO PRODUCTS' }, { label: 'HMC PRODUCTS' }],
        },
      ],
    },
    {
      label: 'My Membership',
      items: [{ label: 'Premium Member' }, { label: 'Rewards Points' }],
    },
  ];

  onCategoryChange(category: string) {
    this.store.setCategory(category); // updates store immediately
  }
}
