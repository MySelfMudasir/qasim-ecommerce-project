export interface MyOrderModel {
  id: string;
  orderId: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  category: string;
  brand: string;
  quantity: string;
  storageType: string;
  size: string;
  orderStatus: string;
  paymentStatus: string;
  mode: string;

  collection?: {
    collectionLocation: string;
    collectionDate: string;
    collectionTime: string;
  };
}