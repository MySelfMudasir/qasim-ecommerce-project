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
import { withStorageSync, withLocalStorage } from '@angular-architects/ngrx-toolkit';
import { AddReviewParams, UserReviewModel } from './models/user-review';
import { SearchLoadingService } from './services/search-loading';
import { SeoManager } from './services/seo-manager';
import { CheckoutModel } from './models/checkout';
import { formatDate } from '@angular/common';
import { PRODUCTS } from './data/products.data';
import { CATEGORIES } from './data/categories.data';
import { AuthService } from './services/auth-service';
import { ApiService } from './services/backend/api-service';
import { elementAt, firstValueFrom } from 'rxjs';

export type EcommerceState = {
  products: ProductModel[];
  categoriesList: string[];
  selectedCategory: string;
  wishlistItems: ProductModel[];
  cartItems: cartModel[];
  user: UserModel | undefined;
  selectedProductId: string | undefined;
  writeReview: boolean;
  preLoader: boolean;
  loading: boolean;
  isSkeletonLoading: boolean;
  skeletonLoadingTime: string | null;
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
  popularProductsList: ProductModel[];
  topSellingProductsList: ProductModel[];
  recommendedProductsList: ProductModel[];
};

const LOGOUT_STATE: Partial<EcommerceState> = {
  user: undefined,
  writeReview: false,
  // cartItems: [],
  // wishlistItems: [],
  // selectedProductId: undefined,
  // isSkeletonLoading: false,
  // preLoader: false,
  // searchLoading: false,
};

export const EcommerceStore = signalStore(
  {
    providedIn: 'root',
  },
  withState({
    products: [],
    categoriesList: CATEGORIES,
    selectedCategory: 'all',
    wishlistItems: [],
    cartItems: [],
    user: undefined,
    selectedProductId: undefined,
    writeReview: false,
    preLoader: false,
    loading: false,
    isSkeletonLoading: true,
    skeletonLoadingTime: '3s',
    searchLoading: false,
    isLoadingMore: false,
    searchedProduct: '',
    checkout: {
      mode: 'collection', // default
      shipping: null,
      collection: {
        collectionLocation:
          'Khyber Foods LTD: Khyber Food Ltd, Unit C Doris Rd, Birmingham B9 4SJ, United Kingdom',
        collectionDate: null,
        collectionTime: null,
      },
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
    popularProductsList: [],
    topSellingProductsList: [],
    recommendedProductsList: [],
  } as EcommerceState),

  withStorageSync(
    {
      key: 'E-Commerce Store',
      select: ({ user, wishlistItems, cartItems }) => ({ user, wishlistItems, cartItems }),
    },
    withLocalStorage(),
  ),

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
            .filter(
              (p) =>
                p.category.toLowerCase() === selected.category.toLowerCase() &&
                p.id !== selected.id,
            )
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
        selectedProduct: computed(
          () => products().find((p) => p.id === selectedProductId()) ?? undefined,
        ),
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
      authService = inject(AuthService),
      apiService = inject(ApiService),
    ) => {
      const getUserId = () => {
        const id = store.user()?.id;
        if (!id) return null;
        return Number(id);
      };

      return {
        loadProducts: async (
          category = store.selectedCategory(),
          limit = store.itemsPerPage(),
          page = 1,
        ) => {
          patchState(store, { isSkeletonLoading: true });
          try {
            const response = await firstValueFrom(
              apiService.loadProducts(
                undefined,
                category,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                limit,
                page,
              ),
            );
            console.log('Products API Response:', response);

            patchState(store, {
              products: response.data || response.products || [],
              isSkeletonLoading: false,
            });
          } catch (error) {
            console.error('Products API Error:', error);
            patchState(store, { products: [], isSkeletonLoading: false });
            toaster.error('Failed to load products');
          }
        },

        setCategory: signalMethod<string>((selectedCategory: string) => {
          patchState(store, {
            selectedCategory,
            searchedProduct: '',
          });
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

        loadProductDetails: async (productId: string) => {
          if (store.isSkeletonLoading() && store.selectedProductId() === productId) return;
          patchState(store, { selectedProductId: productId, isSkeletonLoading: true });
          try {
            const response = await firstValueFrom(apiService.productDetails(productId));
            const raw = response.data || response.product || response;
            const product: ProductModel = {
              ...raw,
              reviews: Array.isArray(raw.reviews) ? raw.reviews : [],
            };

            const existing = store.products();
            const index = existing.findIndex((p) => p.id === productId);
            const updatedProducts =
              index !== -1
                ? existing.map((p, i) => (i === index ? product : p))
                : [...existing, product];

            patchState(store, { products: updatedProducts, isSkeletonLoading: false });

            seoManager.updateSeoTags({
              title: product.name,
              description: product.description,
              image: product.imageUrl,
              type: 'product',
            });

            // Fire related product calls in parallel
            const [popularRes, topSellingRes, recommendedRes] = await Promise.allSettled([
              firstValueFrom(apiService.loadPopularProducts(6)),
              firstValueFrom(apiService.loadTopSellingProducts(6)),
              firstValueFrom(apiService.loadRecommendedProducts(product.category, productId, 6)),
            ]);

            const normalize = (res: PromiseSettledResult<any>, fallback: ProductModel[]) => {
              if (res.status === 'fulfilled') {
                const data = res.value?.data || res.value?.products || [];
                return data.map((p: any) => ({
                  ...p,
                  reviews: Array.isArray(p.reviews) ? p.reviews : [],
                }));
              }
              return fallback;
            };

            patchState(store, {
              popularProductsList: normalize(popularRes, store.popularProductsList()),
              topSellingProductsList: normalize(topSellingRes, store.topSellingProductsList()),
              recommendedProductsList: normalize(recommendedRes, store.recommendedProductsList()),
            });
          } catch (error) {
            console.error('Product Details API Error:', error);
            patchState(store, { isSkeletonLoading: false });
          } finally {
            searchLoadingService.close();
          }
        },

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
          patchState(store, { isSkeletonLoading: true });

          // // 2. simulate API delay (or real API later)
          setTimeout(() => {
            patchState(store, { isSkeletonLoading: false });
          }, 1500);
        },

        openCart: () => {
          patchState(store, { isSkeletonLoading: true });

          // // 2. simulate API delay (or real API later)
          setTimeout(() => {
            patchState(store, { isSkeletonLoading: false });
          }, 1500);
        },

        // Skeleton methods
        setIsSkeletonLoading: signalMethod<boolean>((value: boolean) => {
          patchState(store, { isSkeletonLoading: value });
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
          const uid = getUserId();
          if (uid) {
            apiService.addToWishlist(uid, Number(product.id)).subscribe({ error: () => {} });
          }
        },

        removeFromWishlist: (product: ProductModel) => {
          const updatedWishlistItems = store.wishlistItems().filter((p) => p.id !== product.id);
          patchState(store, { wishlistItems: updatedWishlistItems });
          toaster.success(`Product removed from wishlist`);
          const uid = getUserId();
          if (uid) {
            apiService.removeFromWishlist(uid, Number(product.id)).subscribe({ error: () => {} });
          }
        },

        clearWishlist: () => {
          patchState(store, { wishlistItems: [] });
          const uid = getUserId();
          if (uid) {
            apiService.clearWishlist(uid).subscribe({ error: () => {} });
          }
        },

        loadMoreProducts: () => {
          patchState(store, { isLoadingMore: true });

          const batchSize = store.itemsPerPage();
          const baseIndex = store.products().length + 1;
          const searchTerm = store.searchedProduct().trim();
          const selectedCategory = store.selectedCategory().toLowerCase();
          const category =
            selectedCategory !== 'all'
              ? selectedCategory
              : (store.selectedCategories()[0]?.toLowerCase() ?? 'all');
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
              price:
                priceRange[0] + (productNumber % Math.max(1, priceRange[1] - priceRange[0] + 1)),
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
          const newQuantity =
            existingItemIndex !== -1
              ? store.cartItems()[existingItemIndex].quantity + quantity
              : quantity;
          const updateCartItems = produce(store.cartItems(), (draft) => {
            if (existingItemIndex !== -1) {
              draft[existingItemIndex].quantity += quantity;
              return;
            }
            draft.push({ product, quantity });
          });
          patchState(store, { cartItems: updateCartItems });
          toaster.success(
            existingItemIndex !== -1 ? 'Product added again' : 'Product added to cart',
          );
          const uid = getUserId();
          if (uid) {
            apiService
              .addToCart(uid, Number(product.id), newQuantity)
              .subscribe({ error: () => {} });
          }
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
          const updatedCartItems = store.cartItems().filter((c) => c.product.id !== product.id);
          patchState(store, { cartItems: updatedCartItems });
          const uid = getUserId();
          if (uid) {
            apiService.removeFromCart(uid, Number(product.id)).subscribe({ error: () => {} });
          }
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
            if (!checkout.collection?.collectionDate || !checkout.collection?.collectionTime) {
              toaster.error('Please select collection date and time');
              patchState(store, { loading: false });
              return;
            }
          }

          const date = checkout.collection?.collectionDate;
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
              checkout.mode === 'collection' ? checkout.collection?.collectionLocation || '' : '',

            collectionDate:
              checkout.mode === 'collection' && checkout.collection?.collectionDate
                ? formatDate(checkout.collection.collectionDate, 'yyyy-MM-dd', 'en-US')
                : '',

            collectionTime:
              checkout.mode === 'collection' ? checkout.collection?.collectionTime || '' : '',

            paymentStatus: 'success',
          };

          // --- NEW: LOGGING THE ORDER DETAILS BEFORE SUBMIT ---
          console.group('📦 Order Submitted');
          console.log('👤 User:', user);
          console.log('👤 Checkout:', checkout);
          console.log('🚚 Mode:', checkout.mode.toUpperCase());
          console.log('📝 Full Order Payload:', order);
          console.groupEnd();

          await new Promise((res) => setTimeout(res, 2000));

          patchState(store, { loading: false, cartItems: [] });
          router.navigate(['/order-success']);
          toaster.success('Order placed successfully!');
        },

        signUp: (payload: any) => {
          patchState(store, { loading: true });

          apiService.register(payload).subscribe({
            next: (response: any) => {
              console.log('SIGNUP RESPONSE:', response);

              const userData = response?.data?.user || response?.user;

              if (!userData) {
                patchState(store, { loading: false });
                toaster.error('Invalid API response: user missing');
                return;
              }

              const token = response?.data?.token || response?.token;

              const user: UserModel = {
                id: userData.id,
                name: userData.name,
                email: userData.email,
                imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
                checkoutMode: { mode: 'collection' },
              };

              if (token) {
                authService.setSession(token);
              }

              patchState(store, {
                user,
                loading: false,
              });

              toaster.success('Account created Successfully');
              router.navigate(['/signup-success']);
            },

            error: (err) => {
              patchState(store, { loading: false });
              toaster.error(err?.error?.message || 'Signup failed');
            },
          });
        },

        signIn: ({ email, password, checkout, dialogId, redirectUrl }: SignInParams) => {
          console.log('Signing in with', { email, password, checkout, dialogId, redirectUrl });
          patchState(store, { loading: true });
          apiService.login({ email, password }).subscribe({
            next: (response) => {
              console.log('Login Response:', response);

              const user: UserModel = {
                id: response.data.user.id,
                name: response.data.user.name,
                email: response.data.user.email,
                imageUrl: 'https://img.icons8.com/ios_filled/1200/user-male-circle.jpg',
                checkoutMode: response.data.user.checkoutMode || { mode: 'collection' },
              };

              // Save JWT Token
              authService.setSession(response.data.token);

              patchState(store, {
                user,
                loading: false,
                checkout: {
                  ...store.checkout(),
                  mode: 'collection',
                },
              });

              toaster.success(`Signed in Successfully as ${email}`);
              matDialog.getDialogById(dialogId)?.close();

              // Sync wishlist and cart from DB
              const userId = Number(response.data.user.id);

              apiService.getWishlist(userId).subscribe({
                next: (res) => {
                  const items = res?.data || res?.items || [];
                  patchState(store, { wishlistItems: items });
                },
                error: () => {},
              });

              apiService.getCart(userId).subscribe({
                next: (res) => {
                  const items = res?.data || res?.items || [];
                  patchState(store, { cartItems: items });
                },
                error: () => {},
              });

              if (redirectUrl) {
                router.navigate([redirectUrl]);
              } else if (checkout) {
                router.navigate(['/checkout']);
              } else {
                router.navigate(['/']); // fallback (IMPORTANT)
              }
            },

            error: (error) => {
              patchState(store, { loading: false });
              console.error(error);
              toaster.error(error?.error?.message || 'Invalid email or password');
            },
          });
        },

        signOut: () => {
          patchState(store, LOGOUT_STATE);
          authService.logout();
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
            isSkeletonLoading: true,
            preLoader: false,
            searchLoading: true,
          });

          firstValueFrom(
            apiService.loadProducts(
              term,
              undefined,
              undefined,
              undefined,
              undefined,
              undefined,
              undefined,
              undefined,
              store.itemsPerPage(),
              1,
            ),
          )
            .then((response) => {
              const products = (response?.data || response?.products || []).map((p: any) => ({
                ...p,
                reviews: Array.isArray(p.reviews) ? p.reviews : [],
              }));
              searchLoadingService.close();
              patchState(store, {
                products,
                isSkeletonLoading: false,
                searchLoading: false,
              });
            })
            .catch(() => {
              searchLoadingService.close();
              patchState(store, { isSkeletonLoading: false, searchLoading: false });
            });
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
      };
    },
  ),
);
