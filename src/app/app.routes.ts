import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'products/all',
      },
      {
        path: 'products/:selectedCategory',
        loadComponent: () =>
          import('./pages/products-grid/products-grid').then(m => m.ProductsGrid),
      },
      {
        path: 'product/:productId',
        loadComponent: () =>
          import('./pages/view-product-details/view-product-details').then(m => m.ViewProductDetails),
      },
      {
        path: 'wishlist',
        loadComponent: () =>
          import('./pages/my-wishlist/my-wishlist').then(m => m.MyWishlist),
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./pages/view-cart/view-cart').then(m => m.ViewCart),
      },
      {
        path: 'checkout',
        loadComponent: () =>
          import('./pages/checkout/checkout').then(m => m.Checkout),
      },
      {
        path: 'order-success',
        loadComponent: () =>
          import('./pages/order-success/order-success').then(m => m.OrderSuccess),
      },
      {
        path: 'signup-success',
        loadComponent: () =>
          import('./pages/signup-success/signup-success').then(m => m.SignupSuccess),
      },
      {
        path: 'multi-step-sign-up',
        loadComponent: () =>
          import('./pages/multi-step-sign-up/multi-step-sign-up').then(m => m.MultiStepSignUp),
      },
      // invalid route - redirect to products
      {
        path: '**',
        redirectTo: 'products/all'
      },
    ],
  },
];