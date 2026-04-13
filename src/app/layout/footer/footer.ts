import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  readonly currentYear = new Date().getFullYear();

  readonly categoryColumns = [
    ['Dairy & Eggs', 'Meat', 'Oil', 'Rice & Noodles', 'Fruit & Veg', 'Appetizers'],
    ['Chips & Potatoes', 'Poultry', 'Packaging', 'Sauces & Dressings', 'Flour & Breading', 'Cleaning & Hygiene'],
    ['Drinks', 'Burgers & Kebabs', 'Desserts', 'Pastry & Bread', 'Seafood', 'Cooking Ingredients'],
  ];

  readonly companyInfo = ['About', 'Membership & Services', 'Deliveries', 'Store Locator', 'FAQs', 'Privacy Policy'];
  readonly purchasing = ['QSR & Takeaways', 'Wholesale', 'Franchises', 'Custom Label Packaging', 'Retail', 'Click & Collect'];
}
