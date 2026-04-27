export type UserModel = {
    id: string;
    email: string;
    name: string;
    imageUrl: string;
    delivery?: boolean;
}

export type SignUpParams = {
    email: string;
    password: string;
    name: string;
    checkout?: boolean;
    dialogId: string;
    redirectUrl?: string;
    delivery?: boolean;
}

export type SignInParams =  {
    email: string;
    password: string;
    name?: string;
    checkout?: boolean;
    dialogId: string;
    redirectUrl?: string;
    delivery?: boolean;
}