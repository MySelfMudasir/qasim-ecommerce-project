import { UserReviewModel } from "./user-review";

export type ProductModel = {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    rating: number;
    reviewCount: number;
    inStock: boolean;
    category: string;
    reviews: UserReviewModel[];
}