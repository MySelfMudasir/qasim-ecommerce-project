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
import { SearchLoadingService } from './services/search-loading';
import { SeoManager } from './services/seo-manager';
import { CheckoutModel } from './models/checkout';
import { formatDate } from '@angular/common';
import { PRODUCTS } from './data/products.data';
import { CATEGORIES } from './data/categories.data';

export type EcommerceState = {
  products: ProductModel[];
  categoriesList: string[];
  selectedCategory: string;
  wishlistItems: ProductModel[];
  cartItems: cartModel[];
  user: UserModel | undefined;
  loading: boolean;
  selectedProductId: string | undefined;
  writeReview: boolean;
  skeleton: boolean;
  preLoader: boolean;
  searchLoading: boolean;
  isLoadingMore: boolean;
  searchedProduct: string;
  checkout: CheckoutModel;
  // Filter state
  selectedBrands: string[];
  selectedCategories: string[];
  priceRange: [number, number];
  selectedStorageTypes: string[];
  selectedSizes: string[];
  selectedFeatures: string[];
  selectedSort: string;
  showOutOfStock: boolean;
  itemsPerPage: number;
  displayedItemCount: number;
};

const LOGOUT_STATE: Partial<EcommerceState> = {
  user: undefined,
  writeReview: false,
  // cartItems: [],
  // wishlistItems: [],
  // selectedProductId: undefined,
  // skeleton: false,
  // preLoader: false,
  // searchLoading: false,
};

export const EcommerceStore = signalStore(
  {
    providedIn: 'root',
  },
  withState({
    // products: [],
    products: PRODUCTS,
    categoriesList: CATEGORIES,
    selectedCategory: 'all',
    wishlistItems: [],
    cartItems: [],
    user: undefined,
    loading: false,
    selectedProductId: undefined,
    writeReview: false,
    skeleton: true,
    preLoader: false,
    searchLoading: false,
    isLoadingMore: false,
    searchedProduct: '',
    checkout: {
      mode: 'collection', // default
      collectionLocation: 'Khyber Foods LTD',
      collectionDate: null,
      collectionTime: null,
      shipping: null,
    } as CheckoutModel,
    // Filter state
    selectedBrands: [],
    selectedCategories: [],
    priceRange: [0, 500],
    selectedStorageTypes: [],
    selectedSizes: [],
    selectedFeatures: [],
    selectedSort: 'relevance',
    showOutOfStock: true,
    itemsPerPage: 10,
    displayedItemCount: 10,
  } as EcommerceState),

  // withStorageSync({
  //   key: 'E-Commerce Store',
  //   select: ({ user, wishlistItems, cartItems }) => ({ user, wishlistItems, cartItems }),
  // }),

  withComputed(
    ({
      selectedCategory,
      products,
      wishlistItems,
      cartItems,
      selectedProductId,
      searchedProduct,
      selectedBrands,
      selectedCategories,
      priceRange,
      selectedStorageTypes,
      selectedSizes,
      selectedFeatures,
      selectedSort,
      showOutOfStock,
      displayedItemCount,
    }) => {
      const getFilteredProducts = () => {
        let filtered = [...products()];

        if (searchedProduct()) {
          const searchTerm = searchedProduct().toLowerCase();
          filtered = filtered.filter((p) => {
            const searchableText = [
              p.name,
              p.description,
              p.category,
              (p as any).brand,
              (p as any).storageType,
              (p as any).size,
            ]
              .filter(Boolean)
              .join(' ')
              .toLowerCase();

            return searchableText.includes(searchTerm);
          });
        } else if (selectedCategory().toLowerCase() !== 'all') {
          filtered = filtered.filter(
            (p) => p.category.toLowerCase() === selectedCategory().toLowerCase(),
          );
        }

        if (selectedCategories().length > 0) {
          filtered = filtered.filter((p) =>
            selectedCategories().some((cat) => p.category.toLowerCase() === cat.toLowerCase()),
          );
        }

        const [minPrice, maxPrice] = priceRange();
        filtered = filtered.filter((p) => p.price >= minPrice && p.price <= maxPrice);

        if (selectedBrands().length > 0) {
          filtered = filtered.filter((p) =>
            selectedBrands().some(
              (brand) => brand.toLowerCase() === String((p as any).brand || '').toLowerCase(),
            ),
          );
        }

        if (selectedStorageTypes().length > 0) {
          filtered = filtered.filter((p) =>
            selectedStorageTypes().some(
              (type) => type.toLowerCase() === String((p as any).storageType || '').toLowerCase(),
            ),
          );
        }

        if (selectedSizes().length > 0) {
          filtered = filtered.filter((p) =>
            selectedSizes().some(
              (size) => size.toLowerCase() === String((p as any).size || '').toLowerCase(),
            ),
          );
        }

        if (selectedFeatures().length > 0) {
          filtered = filtered.filter((p) =>
            selectedFeatures().some((feature) => {
              switch (feature) {
                case 'new-arrivals':
                  return Boolean((p as any).isNew);
                case 'monthly-promos':
                  return Boolean((p as any).onPromotion);
                case 'reduced':
                  return Boolean((p as any).reducedToClear);
                default:
                  return true;
              }
            }),
          );
        }

        if (!showOutOfStock()) {
          filtered = filtered.filter((p) => p.inStock);
        }

        switch (selectedSort()) {
          case 'price-asc':
            filtered.sort((a, b) => a.price - b.price);
            break;
          case 'price-desc':
            filtered.sort((a, b) => b.price - a.price);
            break;
          case 'rating':
            filtered.sort((a, b) => b.rating - a.rating);
            break;
          case 'newest':
            filtered.sort((a, b) => Number(b.id) - Number(a.id));
            break;
          default:
            break;
        }

        return filtered;
      };

      return {
        filteredProducts: computed(() => getFilteredProducts()),
        displayedProducts: computed(() => getFilteredProducts().slice(0, displayedItemCount())),
        hasMoreItems: computed(() => getFilteredProducts().length > displayedItemCount()),
        recommendedProducts: computed(() => {
          const selectedId = selectedProductId();
          if (!selectedId) {
            return products().slice(0, 6);
          }
          const selected = products().find((p) => p.id === selectedId);
          if (!selected) {
            return products().slice(0, 6);
          }
          return products()
            .filter((p) => p.category.toLowerCase() === selected.category.toLowerCase() && p.id !== selected.id)
            .slice(0, 6);
        }),
        popularProducts: computed(() => {
          return products()
            .slice()
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 6);
        }),
        topSellingProducts: computed(() => {
          return products()
            .slice()
            .sort((a, b) => b.reviewCount - a.reviewCount)
            .slice(0, 6);
        }),
        wishlistCount: computed(() => wishlistItems().length),
        cartCount: computed(() => cartItems().length),
        selectedProduct: computed(() => products().find((p) => p.id === selectedProductId()) ?? undefined),
      };
    },
  ),

  withMethods(
    (
      store,
      toaster = inject(HotToastService),
      matDialog = inject(MatDialog),
      router = inject(Router),
      seoManager = inject(SeoManager),
      searchLoadingService = inject(SearchLoadingService),
    ) => ({
      setCategory: signalMethod<string>((selectedCategory: string) => {
        searchLoadingService.open();
        // // 1. show skeleton
        patchState(store, {
          selectedCategory,
          searchedProduct: '',
          skeleton: true,
          preLoader: false,
        });

        // // 2. simulate API delay (or real API later)
        setTimeout(() => {
          searchLoadingService.close();
          patchState(store, { skeleton: false });
        }, 500);
      }),

      setProductsListSeoTags: signalMethod<string | undefined>((category) => {
        const selectedCategory = category
          ? category.charAt(0).toUpperCase() + category.slice(1)
          : undefined;
        const description = selectedCategory
          ? `Browse our collection of ${selectedCategory} products`
          : 'Browse our collection of products';
        seoManager.updateSeoTags({
          title: selectedCategory ? `${selectedCategory}` : 'All',
          description,
        });
      }),

      setProductId: signalMethod<string>((productId: string) => {
        patchState(store, { selectedProductId: productId });
        const product = store.products().find((p) => p.id === productId);
        if (product) {
          seoManager.updateSeoTags({
            title: product.name,
            description: product.description,
            image: product.imageUrl, // ← ADD THIS — was missing!
            type: 'product',
          });
        }
      }),

      setProductSeoTags: signalMethod<ProductModel | undefined>((product) => {
        if (!product) return;
        seoManager.updateSeoTags({
          title: product.name,
          description: product.description,
          image: product.imageUrl,
          type: 'product',
        });
      }),

      openWishlist: () => {
        patchState(store, { skeleton: true });

        setTimeout(() => {
          patchState(store, { skeleton: false });
        }, 500);
      },

      openCart: () => {
        patchState(store, { skeleton: true });

        setTimeout(() => {
          patchState(store, { skeleton: false });
        }, 500);
      },
      
      // Skeleton methods
      setSkeleton: signalMethod<boolean>((value: boolean) => {
        patchState(store, { skeleton: value });
      }),

      setPreLoader: signalMethod<boolean>((value: boolean) => {
        patchState(store, { preLoader: value });
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
        patchState(store, { isLoadingMore: true });

        const batchSize = store.itemsPerPage();
        const baseIndex = store.products().length + 1;
        const searchTerm = store.searchedProduct().trim();
        const selectedCategory = store.selectedCategory().toLowerCase();
        const category = selectedCategory !== 'all'
          ? selectedCategory
          : store.selectedCategories()[0]?.toLowerCase() ?? 'all';
        const priceRange = store.priceRange();
        const brand = store.selectedBrands()[0] ?? 'Demo Brand';
        const storageType = store.selectedStorageTypes()[0] ?? 'Standard';
        const size = store.selectedSizes()[0] ?? 'M';

        const moreProducts = Array.from({ length: batchSize }, (_, index) => {
          const productNumber = baseIndex + index;
          const nameSeed = searchTerm || category || 'product';
          return {
            id: crypto.randomUUID(),
            name: `${nameSeed} ${productNumber}`,
            price: priceRange[0] + (productNumber % Math.max(1, priceRange[1] - priceRange[0] + 1)),
            category: category === 'all' ? 'all' : category,
            imageUrl: 'https://placehold.co/600x400',
            rating: 4,
            reviewCount: 5,
            inStock: true,
            description: `Demo product ${productNumber} for ${nameSeed}`,
            reviews: [],
            brand,
            storageType,
            size,
            isNew: store.selectedFeatures().includes('new-arrivals'),
            onPromotion: store.selectedFeatures().includes('monthly-promos'),
            reducedToClear: store.selectedFeatures().includes('reduced'),
          } as ProductModel;
        });

        setTimeout(() => {
          patchState(store, {
            products: [...store.products(), ...moreProducts],
            displayedItemCount: store.displayedItemCount() + batchSize,
            isLoadingMore: false,
          });
        }, 500);
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
        console.log('proceed to checkout', store.cartItems());
        if (!store.user()) {
          matDialog.open(SignInDialog, {
            disableClose: true,
            data: {
              checkout: false,
            },
          });
          return;
        }
        if (store.cartCount() === 0) {
          toaster.error('Your cart is empty');
          patchState(store, { loading: false });
          return;
        }

        router.navigate(['/checkout']);
      },

      updateCheckout: signalMethod<Partial<CheckoutModel>>((payload) => {
        patchState(store, {
          checkout: {
            ...store.checkout(),
            ...payload,
          },
        });
      }),

      placeOrder: async () => {
        patchState(store, { loading: true });

        const user = store.user();
        const checkout = store.checkout();

        if (!user) {
          toaster.error('Please sign in to place the order');
          patchState(store, { loading: false });
          return;
        }

        console.log(checkout);

        // DELIVERY
        if (checkout.mode === 'delivery') {
          if (!checkout.shipping) {
            toaster.error('Please fill shipping details');
            patchState(store, { loading: false });
            return;
          }
        } else {
          if (!checkout.collectionDate || !checkout.collectionTime) {
            toaster.error('Please select collection date and time');
            patchState(store, { loading: false });
            return;
          }
        }

        const date = checkout.collectionDate;
        const formattedDate = date
          ? `${date.getFullYear()}-${(date.getMonth() + 1)
              .toString()
              .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
          : '';

        const order: orderModel = {
          id: crypto.randomUUID(),
          userId: user.id,
          total: Math.round(
            store.cartItems().reduce((acc, item) => acc + item.product.price * item.quantity, 0),
          ),
          items: store.cartItems(),

          shippingAddress: checkout.mode === 'delivery' ? checkout.shipping?.address || '' : '',

          collectionLocation:
            checkout.mode === 'collection' ? checkout.collectionLocation || '' : '',

          collectionDate:
            checkout.mode === 'collection' && checkout.collectionDate
              ? formatDate(checkout.collectionDate, 'yyyy-MM-dd', 'en-US')
              : '',

          collectionTime: checkout.mode === 'collection' ? checkout.collectionTime || '' : '',

          paymentStatus: 'success',
        };

        // --- NEW: LOGGING THE ORDER DETAILS BEFORE SUBMIT ---
        console.group('📦 Order Submitted');
        console.log('👤 User:', user);
        console.log('🚚 Mode:', checkout.mode.toUpperCase());
        console.log('📝 Full Order Payload:', order);
        console.groupEnd();

        await new Promise((res) => setTimeout(res, 2000));

        patchState(store, { loading: false, cartItems: [] });
        router.navigate(['/order-success']);
        toaster.success('Order placed successfully!');
      },

      signUp: ({ email, checkout, dialogId, redirectUrl }: SignInParams) => {
        // console.log('Signing up with', { email, checkout, dialogId, redirectUrl });
        patchState(store, {
          user: {
            id: crypto.randomUUID(),
            name: email.split('@')[0],
            email,
            imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
            checkoutMode: { mode: 'delivery' },
          },
        });

        toaster.success(`Account created for ${email}`);
        matDialog.getDialogById(dialogId)?.close();
        if (checkout) {
          router.navigate(['/checkout']);
          toaster.success('Proceeding to checkout...');
        } else if (redirectUrl) {
          router.navigate([redirectUrl]);
        }
      },

      signIn: ({ email, checkout, dialogId, redirectUrl }: SignInParams) => {
        // console.log('Signing in with', { email, checkout, dialogId, redirectUrl });
        const mode: CheckoutModel['mode'] = 'collection';

        patchState(store, {
          user: {
            id: '1',
            name: 'John Doe',
            email: email,
            imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
            checkoutMode: { mode: 'collection' },
          },
          checkout: {
            ...store.checkout(),
            mode,
          },
        });

        toaster.success(`Signed in as ${email}`);
        matDialog.getDialogById(dialogId)?.close();

        if (checkout) {
          router.navigate(['/checkout']);
        } else if (redirectUrl) {
          router.navigate([redirectUrl]);
        }
      },

      signOut: () => {
        patchState(store, LOGOUT_STATE);
        // router.navigate(['/']);
      },

      showWriteReview: () => {
        if (!store.user()) {
          matDialog.open(SignInDialog, {
            disableClose: true,
            data: {
              redirectUrl: `/product/${store.selectedProductId()}`,
            },
          });

          return;
        }
        patchState(store, { writeReview: true });
      },

      hideWriteReview: () => {
        patchState(store, { writeReview: false });
      },

      addReview: async ({ title, rating, comment }: AddReviewParams) => {
        patchState(store, { loading: true });
        const product = store.products().find((p) => p.id === store.selectedProductId());
        if (!product) {
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
          const index = draft.findIndex((p) => p.id === product.id);
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
        patchState(store, { loading: false, products: updatedProducts, writeReview: false });
      },

      setSearchTerm: signalMethod<string>((term: string) => {
        searchLoadingService.open();
        patchState(store, {
          searchedProduct: term,
          selectedCategory: 'all',
          skeleton: true,
          preLoader: false,
          searchLoading: true,
        });

        // 2. simulate delay
        setTimeout(() => {
          searchLoadingService.close();
          patchState(store, { skeleton: false, searchLoading: false });
        }, 500);
      }),

      // Filter methods
      setSelectedBrands: signalMethod<string[]>((brands: string[]) => {
        patchState(store, { selectedBrands: brands });
      }),
      

      setSelectedCategories: signalMethod<string[]>((categories: string[]) => {
        patchState(store, { selectedCategories: categories });
      }),

      setPriceRange: signalMethod<[number, number]>((range: [number, number]) => {
        patchState(store, { priceRange: range });
      }),

      setSelectedStorageTypes: signalMethod<string[]>((types: string[]) => {
        patchState(store, { selectedStorageTypes: types });
      }),

      setSelectedSizes: signalMethod<string[]>((sizes: string[]) => {
        patchState(store, { selectedSizes: sizes });
      }),

      setSelectedFeatures: signalMethod<string[]>((features: string[]) => {
        patchState(store, { selectedFeatures: features });
      }),

      setSelectedSort: signalMethod<string>((sortBy: string) => {
        patchState(store, { selectedSort: sortBy });
      }),

      setShowOutOfStock: signalMethod<boolean>((show: boolean) => {
        patchState(store, { showOutOfStock: show });
      }),

      clearFilters: () => {
        patchState(store, {
          selectedBrands: [],
          selectedCategories: [],
          priceRange: [0, 500],
          selectedStorageTypes: [],
          selectedSizes: [],
          selectedFeatures: [],
          selectedSort: 'relevance',
          showOutOfStock: false,
        });
      },
    }),
  ),
);
