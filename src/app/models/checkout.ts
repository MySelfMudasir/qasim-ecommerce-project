

export interface ShippingModel {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  paymentMethod: 'creditCard' | 'paypal' | 'cashOnDelivery';
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
  collectionLocation?:string | 'Khyber Food Ltd, Unit C Doris Rd, Birmingham B9 4SJ, United Kingdom';
  collectionDate?: Date | null;
  collectionTime?: string | null;

  // Delivery
  shipping?: ShippingModel | null;
}
