import { CheckoutModel } from "./checkout";

export type UserModel = {
    id: string;
    email: string;
    name: string;
    imageUrl: string;
    checkoutMode: CheckoutModel;
}

export type SignUpParams = {
    email: string;
    password: string;
    name: string;
    checkout?: boolean;
    dialogId: string;
    redirectUrl?: string;
    checkoutmode: CheckoutModel;
}

export type SignInParams =  {
    email: string;
    password: string;
    name?: string;
    checkout?: boolean;
    dialogId: string;
    redirectUrl?: string;
    checkoutmode: CheckoutModel;
}