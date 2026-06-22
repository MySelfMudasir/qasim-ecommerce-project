import { Component, inject, signal } from '@angular/core';
import { BackButton } from '../../components/back-button/back-button';
import { EcommerceStore } from '../../ecommerce-store';
import { ProductCard } from '../../components/product-card/product-card';
import { SkeletonProductCard } from '../../shared/skeletons/skeleton-product-card';
import { SkeletonComponent } from 'boneyard-js/angular';
import { SharedModule } from '../../modules/shared';
import { EmptyOrders } from '../empty-orders/empty-orders';
import { ApiService } from '../../services/backend/api-service';
import { orderModel } from '../../models/order';
import { ProductModel } from '../../models/product';
import { MyOrderModel } from '../../models/myOrderModel';

@Component({
  selector: 'app-my-orders',
  imports: [
    BackButton,
    ProductCard,
    SharedModule,
    EmptyOrders,
    SkeletonProductCard,
    SkeletonComponent,
  ],
  templateUrl: './my-orders.html',
  styleUrl: './my-orders.scss',
})
export class MyOrders {
  store = inject(EcommerceStore);
  apiService = inject(ApiService);
  ordersList: MyOrderModel[] = [];
  userId = Number(this.store.user()?.id);

  orderCount = signal(0);
  pendingOrders = signal(0);
  completedOrders = signal(0);
  orderStatus = signal('all');
  paymentStatus = signal('');

  ngOnInit() {
    this.loadOrders(this.userId);
  }

  loadOrders(userId: number) {
    if (!userId) return;
    this.apiService.getOrders(userId, this.orderStatus()).subscribe({
      next: (res) => {
        const items = res?.data || res?.items || [];
        this.ordersList = items;
        this.orderCount.set(items.length);
        this.pendingOrders.set(items.filter((o: any) => o.orderStatus === 'pending').length);
        this.completedOrders.set(items.filter((o: any) => o.orderStatus === 'completed').length);
      },
      error: (error) => {
        this.ordersList = [];
        this.orderCount.set(0);
        this.pendingOrders.set(0);
        this.completedOrders.set(0);
        console.error('Failed to load orders', error);
      },
    });
  }

  onChange(status: string): void {
    this.orderStatus.set(status);
    this.loadOrders(this.userId);
  }
}
