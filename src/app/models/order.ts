import { cartModel } from "./cart";

export type orderModel = {
    id: string;
    userId: string;
    total: number;
    items: cartModel[];
    shippingAddress: string;
    paymentStatus: 'pending' | 'success' | 'failed';
};