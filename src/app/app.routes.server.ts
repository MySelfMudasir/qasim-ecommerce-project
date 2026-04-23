import { inject } from '@angular/core';
import { RenderMode, ServerRoute } from '@angular/ssr';
import { CategoryApi } from './services/category-api';

// app.routes.server.ts
export const serverRoutes: ServerRoute[] = [
  {
    path: 'products/:selectedCategory',
    renderMode: RenderMode.Server,  // Change from Prerender to Server first
  },
  {
    path: 'product/:productId',
    renderMode: RenderMode.Server,  // Server renders fresh HTML for each request
  },
  { path: 'wishlist', renderMode: RenderMode.Client },
  { path: 'cart', renderMode: RenderMode.Client },
  { path: 'checkout', renderMode: RenderMode.Client },
  { path: 'order-success', renderMode: RenderMode.Client },
  { path: 'signup-success', renderMode: RenderMode.Client },
  { path: 'multi-step-sign-up', renderMode: RenderMode.Client },
  { path: '**', renderMode: RenderMode.Server },
];
