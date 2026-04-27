
export type ShippingModel = {
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
}