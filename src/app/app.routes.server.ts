import { inject } from '@angular/core';
import { RenderMode, ServerRoute } from '@angular/ssr';
import { CategoryApi } from './services/category-api';
import { ProductApi } from './services/product-api';

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
  {
    path: 'product/:productId',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      const productService = inject(ProductApi);
      return productService.getProductIds().map((productId) => ({ productId }));
    },
  },
  { path: 'wishlist', renderMode: RenderMode.Client },
  { path: 'cart', renderMode: RenderMode.Client },
  { path: 'checkout', renderMode: RenderMode.Client },
  { path: 'order-success', renderMode: RenderMode.Client },
  { path: 'signup-success', renderMode: RenderMode.Client },
  { path: 'multi-step-sign-up', renderMode: RenderMode.Client },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
