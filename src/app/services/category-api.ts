import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoryApi {
  private categories = [
    'all',
    'FLOUR BATTER & BREADING',
    'CHEESE',
    'PIZZA TOPPING',
    'VEGETABLES Oil & FAT',
    'DONNER KEBAB',
    'CHICKEN DONNER',
    'CHICKEN PRODUCTS',
    'FISH PRODUCTS',
    'SAUCES & MAYONNAISE',
    'PACKAGING',
    'SAUSAGES & SAVELOYS',
    'BUNS & PITTA BREAD',
    'HMC PRODUCTS',
    'CHIPS, FRIES AND POTATO PRODUCTS',
    'CLEANING MATERIALS',
    'CANS FOOD',
    'SPICES',
    'SOFT DRINKS',
  ];


  getCategories() {
    return this.categories;
  }
  
}
