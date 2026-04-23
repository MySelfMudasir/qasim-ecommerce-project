import { inject } from '@angular/core';
import { RenderMode, ServerRoute } from '@angular/ssr';
import { CategoryApi } from './services/category-api';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'products/:selectedCategory',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      const catService = inject(CategoryApi);
      const names = catService.getCategories();
      return names.map((name) => ({ selectedCategory: name }));
    }
  },

  // ADD THIS — prerender each product page
  {
    path: 'product/:productId',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      // Return all product IDs so each page is pre-rendered with correct OG tags
      return ['1','2','3','4','5','6','7','8','9','10','11','12']
        .map((id) => ({ productId: id }));
    }
  },

  { path: 'wishlist', renderMode: RenderMode.Client },
  { path: 'cart', renderMode: RenderMode.Client },
  { path: 'checkout', renderMode: RenderMode.Client },
  { path: 'order-success', renderMode: RenderMode.Client },
  { path: 'signup-success', renderMode: RenderMode.Client },
  { path: 'multi-step-sign-up', renderMode: RenderMode.Client },
  { path: '**', renderMode: RenderMode.Server },
];
