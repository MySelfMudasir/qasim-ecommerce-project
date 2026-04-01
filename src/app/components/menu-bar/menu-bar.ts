import { Component } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { A11yModule } from "@angular/cdk/a11y";
import { CommonModule } from '@angular/common';
import { MatListItem } from "@angular/material/list";
import { MatRipple } from "@angular/material/core";

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
  sections?: MenuSection[];   // for mega menu
  items?: MenuItem[];         // for simple menu
}


@Component({
  selector: 'app-menu-bar',
  imports: [MatButtonModule, MatMenuModule, MatIcon, A11yModule, CommonModule, MatListItem, MatRipple],
  templateUrl: './menu-bar.html',
  styleUrl: './menu-bar.scss',
})
export class MenuBar {

  menus: MenuGroup[] = [
    {
      label: 'Browse & Shop',
      type: 'mega',
      sections: [
        {
          title: 'Tech',
          items: [
            { label: 'Electronics' },
            { label: 'Accessories' },
            { label: 'Gaming' }
          ]
        },
        {
          title: 'Lifestyle',
          items: [
            { label: 'Clothing' },
            { label: 'Shoes' },
            { label: 'Beauty' }
          ]
        },
        {
          title: 'Home',
          items: [
            { label: 'Home & Garden' },
            { label: 'Kitchen' },
            { label: 'Furniture' }
          ]
        }
      ]
    },
    {
      label: 'Grocery Items',
      items: [
        {
          label: 'Vertebrates',
          children: [
            { label: 'Fishes' },
            { label: 'Birds' }
          ]
        },
        {
          label: 'Invertebrates',
          children: [
            { label: 'Insects' },
            { label: 'Crustaceans' }
          ]
        }
      ]
    },
    {
      label: 'My Membership',
      items: [
        { label: 'Premium Member' },
        { label: 'Rewards Points' }
      ]
    }
  ];
}
