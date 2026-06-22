import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // private baseUrl = `${environment.kpkAndPpfApiBaseUrl}/KpkVps-1/api`;
  private baseUrl = `https://qasim-ecommerce-backend-project.onrender.com/api`;
  // private baseUrl = `http://localhost:3000/api`;

  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, data);
  }

  register(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, payload);
  }

  loadProducts(
    search?: string,
    category?: string,
    brand?: string,
    storageType?: string,
    size?: string,
    minPrice?: number,
    maxPrice?: number,
    inStock?: boolean,
    limit?: number,
    page?: number,
  ): Observable<any> {
    let params = new HttpParams();

    if (search) params = params.set('search', search);
    if (category && category !== 'all') params = params.set('category', category);
    if (brand) params = params.set('brand', brand);
    if (storageType) params = params.set('storageType', storageType);
    if (size) params = params.set('size', size);
    if (minPrice != null) params = params.set('minPrice', minPrice.toString());
    if (maxPrice != null) params = params.set('maxPrice', maxPrice.toString());
    if (inStock != null) params = params.set('inStock', inStock.toString());
    if (limit != null) params = params.set('limit', limit.toString());
    if (page != null) params = params.set('page', page.toString());

    return this.http.get<any>(`${this.baseUrl}/products`, { params });
  }

  productDetails(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/products/${id}`);
  }

  // Recommended, popular, top-selling — reuse loadProducts with sort param
  loadRecommendedProducts(category: string, excludeId: string, limit = 6): Observable<any> {
    let params = new HttpParams();
    if (category && category !== 'all') params = params.set('category', category);
    params = params.set('excludeId', excludeId);
    params = params.set('limit', limit.toString());
    return this.http.get<any>(`${this.baseUrl}/products`, { params });
  }

  loadPopularProducts(limit = 6): Observable<any> {
    let params = new HttpParams().set('sort', 'rating').set('limit', limit.toString());
    return this.http.get<any>(`${this.baseUrl}/products`, { params });
  }

  loadTopSellingProducts(limit = 6): Observable<any> {
    let params = new HttpParams().set('sort', 'reviewCount').set('limit', limit.toString());
    return this.http.get<any>(`${this.baseUrl}/products`, { params });
  }

  // Wishlist
  getWishlist(userId: number): Observable<any> {
    const data = { userId };
    return this.http.post<any>(`${this.baseUrl}/wishlist/all`, data);
  }

  addToWishlist(userId: number, productId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/wishlist/add`, { userId, productId });
  }

  removeFromWishlist(userId: number, productId: number): Observable<any> {
    const data = { userId, productId };
    return this.http.post(`${this.baseUrl}/wishlist/remove`, data);
  }

  clearWishlist(userId: number): Observable<any> {
    const data = { userId };
    return this.http.post(`${this.baseUrl}/wishlist/clear`, data);
  }

  // Cart
  getCart(userId: number): Observable<any> {
    const data = { userId };
    return this.http.post<any>(`${this.baseUrl}/cart/all`, data);
  }

  addToCart(userId: number, productId: number, quantity: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/cart/add`, { userId, productId, quantity });
  }

  updateCartItem(userId: number, productId: number, quantity: number): Observable<any> {
    return this.http.patch(`${this.baseUrl}/cart`, { userId, productId, quantity });
  }

  removeFromCart(userId: number, productId: number): Observable<any> {
    const data = { userId, productId };
    return this.http.post(`${this.baseUrl}/cart/remove`, data);
  }

  clearCart(userId: number): Observable<any> {
    const data = { userId };
    return this.http.post(`${this.baseUrl}/cart/clear`, data);
  }

  placeOrder(order: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/orders/place`, order);
  }

  getOrders(userId: number, orderStatus: string): Observable<any> {
    const data = { userId, orderStatus };
    return this.http.post<any>(`${this.baseUrl}/orders/all`, data);
  }
}
