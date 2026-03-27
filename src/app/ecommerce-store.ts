import { computed, inject } from '@angular/core';
import { ProductModel } from './models/product';
import {
  patchState,
  signalMethod,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { produce } from 'immer';
import { HotToastService } from '@ngxpert/hot-toast';
import { cartModel } from './models/cart';
import { SignInParams, UserModel } from './models/user';
import { SignInDialog } from './components/sign-in-dialog/sign-in-dialog';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { orderModel } from './models/order';
import { withStorageSync } from '@angular-architects/ngrx-toolkit';
import { AddReviewParams, UserReviewModel } from './models/user-review';

export type EcommerceState = {
  products: ProductModel[];
  selectedCategory: string;
  wishlistItems: ProductModel[];
  cartItems: cartModel[];
  user: UserModel | undefined;
  loading: boolean;
  selectedProductId: string | undefined;
  writeReview: boolean;
};

export const EcommerceStore = signalStore(
  {
    providedIn: 'root',
  },
  withState({
    products: [
      {
        id: '1',
        name: 'Vintage Camera',
        description:
          'Capture your moments with a touch of retro style. High-quality manual lens and durable body.',
        price: 149.99,
        imageUrl:
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&w=400&q=80',
        rating: 4.6,
        reviewCount: 134,
        inStock: true,
        category: 'Electronics',
        reviews: [
          {
            id: 'r1',
            productId: '1',
            userId: 'u1',
            userName: 'Anonymous',
            userImageUrl: 'https://randomuser.me/api/portraits/men/0.jpg',
            rating: 5,
            title: 'Great Camera!',
            comment: 'I love the vintage look...',
            reviewDate: new Date('2023-08-02'),
          },
          {
            id: 'r2',
            productId: '1',
            userId: 'u2',
            userName: 'Anonymous',
            userImageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
            rating: 5,
            title: 'Great Camera!',
            comment: 'I love the vintage look...',
            reviewDate: new Date('2023-08-12'),
          },
          {
            id: 'r3',
            productId: '1',
            userId: 'u3',
            userName: 'Anonymous',
            userImageUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
            rating: 5,
            title: 'Great Camera!',
            comment: 'I love the vintage look...',
            reviewDate: new Date('2023-08-15'),
          }
        ],
      },
      {
        id: '2',
        name: 'Ergonomic Office Chair',
        description:
          'Supportive and stylish chair for long working hours. Adjustable height and lumbar support.',
        price: 219.0,
        imageUrl:
          'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&w=400&q=80',
        rating: 4.4,
        reviewCount: 89,
        inStock: true,
        category: 'Furniture',
        reviews: [
          {
            id: 'r1',
            productId: '1',
            userId: 'u1',
            userName: 'Anonymous',
            userImageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
            rating: 5,
            title: 'Great Camera!',
            comment: 'I love the vintage look...',
            reviewDate: new Date('2023-08-15'),
          },
        ],
      },
      {
        id: '3',
        name: 'Bluetooth Headphones',
        description: 'Wireless headphones with noise-cancellation and crystal-clear sound quality.',
        price: 79.95,
        imageUrl:
          'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&w=400&q=80',
        rating: 4.7,
        reviewCount: 432,
        inStock: false,
        category: 'Electronics',
        reviews: [
            {
              id: 'r1',
              productId: '1',
              userId: 'u1',
              userName: 'Anonymous',
              userImageUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
              rating: 5,
              title: 'Great Camera!',
              comment: 'I love the vintage look...',
              reviewDate: new Date('2023-08-15'),
            },
        ],
      },
      {
        id: '4',
        name: 'Leather Journal',
        description:
          'Handcrafted journal with premium leather cover and thick paper for writing or sketching.',
        price: 24.5,
        imageUrl:
          'https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?auto=format&w=400&q=80',
        rating: 4.8,
        reviewCount: 52,
        inStock: true,
        category: 'Stationery',
        reviews: [
          {
            id: 'r1',
            productId: '1',
            userId: 'u1',
            userName: 'Anonymous',
            userImageUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
            rating: 5,
            title: 'Great Camera!',
            comment: 'I love the vintage look...',
            reviewDate: new Date('2023-08-15'),
          },
        ],
      },
      {
        id: '5',
        name: 'Running Shoes',
        description:
          'Comfortable and breathable shoes designed for runners. Lightweight with excellent grip.',
        price: 99.99,
        imageUrl:
          'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&w=400&q=80',
        rating: 4.3,
        reviewCount: 210,
        inStock: true,
        category: 'Sportswear',
        reviews: [
          {
            id: 'r1',
            productId: '1',
            userId: 'u1',
            userName: 'Anonymous',
            userImageUrl: 'https://randomuser.me/api/portraits/men/4.jpg',
            rating: 5,
            title: 'Great Camera!',
            comment: 'I love the vintage look...',
            reviewDate: new Date('2023-08-15'),
          },
        ],
      },
      {
        id: '6',
        name: 'Ceramic Mug Set',
        description:
          'Set of 4 hand-glazed ceramic mugs perfect for hot beverages and cozy mornings.',
        price: 34.99,
        imageUrl:
          'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&w=400&q=80',
        rating: 4.5,
        reviewCount: 78,
        inStock: false,
        category: 'Kitchenware',
        reviews: [
          {
            id: 'r1',
            productId: '1',
            userId: 'u1',
            userName: 'Anonymous',
            userImageUrl: 'https://randomuser.me/api/portraits/men/5.jpg',
            rating: 5,
            title: 'Great Camera!',
            comment: 'I love the vintage look...',
            reviewDate: new Date('2023-08-15'),
          },
        ],
      },
      {
        id: '7',
        name: 'Mountain Backpack',
        description:
          'Rugged and waterproof backpack suitable for hiking, camping, and outdoor adventures.',
        price: 129.0,
        imageUrl:
          'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&w=400&q=80',
        rating: 4.9,
        reviewCount: 305,
        inStock: true,
        category: 'Outdoor',
        reviews: [
          {
            id: 'r1',
            productId: '1',
            userId: 'u1',
            userName: 'Anonymous',
            userImageUrl: 'https://randomuser.me/api/portraits/men/8.jpg',
            rating: 5,
            title: 'Great Camera!',
            comment: 'I love the vintage look...',
            reviewDate: new Date('2023-08-15'),
          },
        ],
      },
      {
        id: '8',
        name: 'Smart LED Lamp',
        description:
          'Minimalist desk lamp with adjustable brightness and app-controlled color settings.',
        price: 59.49,
        imageUrl:
          'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&w=400&q=80',
        rating: 4.2,
        reviewCount: 120,
        inStock: true,
        category: 'Home',
        reviews: [
          {
            id: 'r1',
            productId: '1',
            userId: 'u1',
            userName: 'Anonymous',
            userImageUrl: 'https://randomuser.me/api/portraits/men/6.jpg',
            rating: 5,
            title: 'Great Camera!',
            comment: 'I love the vintage look...',
            reviewDate: new Date('2023-08-15'),
          },
        ],
      },
      {
        id: '9',
        name: 'Acoustic Guitar',
        description:
          'Classic 6-string acoustic guitar with rich tone and smooth finish. Great for beginners and pros.',
        price: 199.99,
        imageUrl:
          'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&w=400&q=80',
        rating: 4.6,
        reviewCount: 157,
        inStock: true,
        category: 'Musical',
        reviews: [
          {
            id: 'r1',
            productId: '1',
            userId: 'u1',
            userName: 'Anonymous',
            userImageUrl: 'https://randomuser.me/api/portraits/men/7.jpg',
            rating: 5,
            title: 'Great Camera!',
            comment: 'I love the vintage look...',
            reviewDate: new Date('2023-08-15'),
          },
        ],
      },
      {
        id: '10',
        name: 'Succulent Plant Set',
        description:
          'Aesthetic mini succulents in ceramic pots to brighten up your living or workspace.',
        price: 28.0,
        imageUrl:
          'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&w=400&q=80',
        rating: 4.7,
        reviewCount: 64,
        inStock: false,
        category: 'Gardening',
        reviews: [
          {
            id: 'r1',
            productId: '1',
            userId: 'u1',
            userName: 'Anonymous',
            userImageUrl: 'https://randomuser.me/api/portraits/men/9.jpg',
            rating: 5,
            title: 'Great Camera!',
            comment: 'I love the vintage look...',
            reviewDate: new Date('2023-08-15'),
          },
        ],
      },
      {
        id: '11',
        name: 'Succulent Plant Set',
        description:
          'Aesthetic mini succulents in ceramic pots to brighten up your living or workspace.',
        price: 28.0,
        imageUrl:
          'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&w=400&q=80',
        rating: 4.7,
        reviewCount: 64,
        inStock: false,
        category: 'Gardening',
        reviews: [
          {
            id: 'r1',
            productId: '1',
            userId: 'u1',
            userName: 'Anonymous',
            userImageUrl: 'https://randomuser.me/api/portraits/men/10.jpg',
            rating: 5,
            title: 'Great Camera!',
            comment: 'I love the vintage look...',
            reviewDate: new Date('2023-08-15'),
          },
        ],
      },
      {
        id: '12',
        name: 'Succulent Plant Set',
        description:
          'Aesthetic mini succulents in ceramic pots to brighten up your living or workspace.',
        price: 28.0,
        imageUrl:
          'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&w=400&q=80',
        rating: 4.7,
        reviewCount: 64,
        inStock: false,
        category: 'Gardening',
        reviews: [
          {
            id: 'r1',
            productId: '1',
            userId: 'u1',
            userName: 'Anonymous',
            userImageUrl: 'https://randomuser.me/api/portraits/men/11.jpg',
            rating: 5,
            title: 'Great Camera!',
            comment: 'I love the vintage look...',
            reviewDate: new Date('2023-08-15'),
          },
        ],
      },
    ],
    selectedCategory: 'all',
    wishlistItems: [],
    cartItems: [],
    user: undefined,
    loading: false,
    selectedProductId: undefined,
    writeReview: false,
  } as EcommerceState),

  withStorageSync({
    key: 'E-Commerce Store',
    select: ({ user, wishlistItems, cartItems }) => ({ user, wishlistItems, cartItems }),
  }),

  withComputed(({ selectedCategory, products, wishlistItems, cartItems, selectedProductId }) => ({
    filteredProducts: computed(() => {
      if (selectedCategory().toLowerCase() === 'all') return products();
      return products().filter(
        (p) => p.category.toLowerCase() === selectedCategory().toLowerCase(),
      );
    }),

    wishlistCount: computed(() => {
      return wishlistItems().length;
    }),

    cartCount: computed(() => {
      return cartItems().length;
    }),

    selectedProduct: computed(() => {
      return products().find((p) => p.id === selectedProductId()) ?? undefined;
    }),
  })),

  withMethods(
    (
      store,
      toaster = inject(HotToastService),
      matDialog = inject(MatDialog),
      router = inject(Router),
    ) => ({
      setCategory: signalMethod<string>((selectedCategory: string) => {
        patchState(store, { selectedCategory });
      }),

      setProductId: signalMethod<string>((productId: string) => {
        patchState(store, { selectedProductId: productId });
      }),

      addToWishlist: (product: ProductModel) => {
        const updateWishlistItems = produce(store.wishlistItems(), (draft) => {
          if (!draft.find((p) => p.id === product.id)) {
            draft.push(product);
          }
        });
        patchState(store, { wishlistItems: updateWishlistItems });
        toaster.success(`Product added to wishlist`);
      },

      removeFromWishlist: (product: ProductModel) => {
        patchState(store, {
          wishlistItems: store.wishlistItems().filter((p) => p.id !== product.id),
        });
        toaster.success(`Product remove from wishlist`);
      },

      clearWishlist: () => {
        patchState(store, { wishlistItems: [] });
      },

      loadMoreProducts: () => {        
        const moreProducts = [
          {
            id: crypto.randomUUID(),
            name: 'New Product',
            price: 50,
            category: store.selectedCategory(),
            imageUrl: 'https://placehold.co/600x400',
            rating: 4,
            reviewCount: 5,
            inStock: true,
            description: 'Newly loaded product MILK Solids, Corn Starch, Garlic Powder, Dextrose, Sage, Pepper Extracts (Black & White Pepper), EGG Powder.',
            reviews: [],
          },
        ];

        patchState(store, {
          products: [...store.products(), ...moreProducts],
        });
      },

      addToCart: (product: ProductModel, quantity = 1) => {
        const existingItemIndex = store.cartItems().findIndex((i) => i.product.id === product.id);
        const updateCartItems = produce(store.cartItems(), (draft) => {
          if (existingItemIndex !== -1) {
            draft[existingItemIndex].quantity += quantity;
            return;
          }
          draft.push({ product, quantity });
        });
        patchState(store, { cartItems: updateCartItems });
        toaster.success(existingItemIndex !== -1 ? 'Product added again' : 'Product added to cart');
      },

      setItemQuantity(params: { productId: string; quantity: number }) {
        const index = store.cartItems().findIndex((c) => c.product.id === params.productId);
        const updated = produce(store.cartItems(), (draft) => {
          draft[index].quantity = params.quantity;
        });

        patchState(store, { cartItems: updated });
      },

      addAllWishlistToCart: () => {
        const updatedCartItems = produce(store.cartItems(), (draft) => {
          store.wishlistItems().forEach((p) => {
            if (!draft.find((c) => c.product.id === p.id)) {
              draft.push({ product: p, quantity: 1 });
            }
          });
        });
        patchState(store, { cartItems: updatedCartItems, wishlistItems: [] });
      },

      // move to wishlist
      moveToWishlist: (product: ProductModel) => {
        const updatedCartItems = store.cartItems().filter((p) => p.product.id !== product.id);
        const updatedWishlistItems = produce(store.wishlistItems(), (draft) => {
          if (!draft.find((p) => p.id === product.id)) {
            draft.push(product);
          }
        });
        patchState(store, {
          cartItems: updatedCartItems,
          wishlistItems: updatedWishlistItems,
        });
      },

      //remove from cart
      removeFromCart: (product: ProductModel) => {
        patchState(store, {
          cartItems: store.cartItems().filter((c) => c.product.id !== product.id),
        });
      },

      proceedToCheckout: () => {
        if (!store.user()) {
          matDialog.open(SignInDialog, {
            disableClose: true,
            data: {
              checkout: true,
            },
          });
          return;
        }
        router.navigate(['/checkout']);
      },

      placeOrder: async () => {
        patchState(store, { loading: true });
        const user = store.user();
        if (!user) {
          toaster.error('Please sign in to place the order');
          patchState(store, { loading: false });
          return;
        }

        const order: orderModel = {
          id: crypto.randomUUID(),
          userId: user.id,
          total: Math.round(
            store.cartItems().reduce((acc, item) => acc + item.product.price * item.quantity, 0),
          ),
          items: store.cartItems(),
          shippingAddress: '123 Main St, Anytown, USA',
          paymentStatus: 'success',
        };

        await new Promise((res) => setTimeout(res, 2000));
        console.log('Order placed:', order);
        patchState(store, { loading: false, cartItems: [] });
        router.navigate(['/order-success']);
        toaster.success('Order placed successfully!');
      },

      signUp: ({ email, checkout, dialogId }: SignInParams) => {
        patchState(store, {
          user: {
            id: crypto.randomUUID(),
            name: email.split('@')[0],
            email,
            imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
          },
        });

        toaster.success(`Account created for ${email}`);
        matDialog.getDialogById(dialogId)?.close();

        if (checkout) {
          router.navigate(['/checkout']);
          toaster.success('Proceeding to checkout...');
        }
      },

      signIn: ({ email, checkout, dialogId }: SignInParams) => {
        patchState(store, {
          user: {
            id: '1',
            name: 'John Doe',
            email: email,
            imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
          },
        });
        toaster.success(`Signed in as ${email}`);
        const dialog = matDialog.getDialogById(dialogId)?.close();
        if (checkout) {
          router.navigate(['/checkout']);
          toaster.success('Proceeding to checkout...');
        }
      },

      signOut: () => {
        patchState(store, { user: undefined });
        router.navigate(['/']);
      },

      showWriteReview: () => {
        patchState(store, { writeReview: true });
      },

      hideWriteReview: () => {
        patchState(store, { writeReview: false });
      },

      addReview: async ({title, rating, comment}: AddReviewParams) => {
        patchState(store, { loading: true });
        const product = store.products().find(p => p.id === store.selectedProductId());
        if(!product) {
          patchState(store, { loading: false });
          toaster.error('Product not found');
          return;
        }

        const review: UserReviewModel = {
          id: crypto.randomUUID(),
          productId: '', // This would typically be passed in or derived from the context
          userId: store.user()?.id || '',
          userName: store.user()?.name || '',
          userImageUrl: store.user()?.imageUrl || '',
          rating,
          title,
          comment,
          reviewDate: new Date(),
        };

        const updatedProducts = produce(store.products(), (draft) => {
        const index = draft.findIndex((p) => p.id = product.id);
        draft[index].reviews.push(review);
        draft[index].rating =
        Math.round(
        (draft[index].reviews.reduce((acc, r) => acc + r.rating, 0) /
        draft[index].reviews.length) *
        10,
        ) / 10;
        draft[index].reviewCount = draft[index].reviews.length;
        });

        await new Promise((res) => setTimeout(res, 2000));
        patchState(store, {  loading: false, products: updatedProducts, writeReview: false });
      }


    }),
  ),
);
