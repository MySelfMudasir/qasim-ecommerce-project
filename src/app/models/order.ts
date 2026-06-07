import { cartModel } from "./cart";

export type orderModel = {
    id: string;
    userId: string;
    total: number;
    items: cartModel[];
    mode: 'collection' | 'delivery';
    // delivery
    shipping: {
        firstName: string;
        lastName: string;
        address: string;
        city: string;
        state: string;
        zipCode: string;
    } | null;
    // collection
    collectionLocation: string;
    collectionDate: string;
    collectionTime: string;
    paymentStatus: 'pending' | 'success' | 'failed';
};