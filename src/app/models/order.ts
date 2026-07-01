import { cartModel } from './cart';

export type orderModel = {
  id?: string;
  userId: number | string;
  total: number;

  items: {
    id: string;
    quantity: number;
    product: any;
  }[];

  mode: 'delivery' | 'collection';

  shipping: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  } | null;

  collection: {
    collectionLocation: string;
    collectionDate: string;
    collectionTime: string;
  } | null;

  paymentStatus: 'pending' | 'completed' | 'failed';
  orderStatus: 'pending' | 'shipped' | 'completed' | 'cancelled' | 'failed';
};
