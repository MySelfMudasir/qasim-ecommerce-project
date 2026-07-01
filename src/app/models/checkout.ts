export interface ShippingModel {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  paymentMethod: 'creditCard' | 'paypal' | 'cashOnDelivery';
}

export interface CollectionModel {
  // Collection
  collectionLocation?: string;
  collectionDate?: Date | null;
  collectionTime?: string | null;
}

export type paymentModel = {
  cardNumber: string;
  cardHolderName: string;
  expirationDate: string;
  cvv: string;
};

export interface CheckoutModel {
  // mode can be 'collection' or 'delivery'
  mode: 'collection' | 'delivery';
  // Collection
  collection?: CollectionModel | null;
  // Delivery
  shipping?: ShippingModel | null;
}
