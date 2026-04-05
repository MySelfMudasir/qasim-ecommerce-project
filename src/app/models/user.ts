export type UserModel = {
    id: string;
    email: string;
    name: string;
    imageUrl: string;
}

export type SignUpParams = {
    email: string;
    password: string;
    name: string;
    checkout?: boolean;
    dialogId: string;
    redirectUrl?: string;
}

export type SignInParams =  {
    email: string;
    password: string;
    name?: string;
    checkout?: boolean;
    dialogId: string;
    redirectUrl?: string;
}