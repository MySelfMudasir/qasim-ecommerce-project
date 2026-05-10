import { UserReviewModel } from "./user-review";

export type ProductModel = {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    images?: string[]; // Array of product images for gallery
    rating: number;
    reviewCount: number;
    inStock: boolean;
    category: string;
    reviews: UserReviewModel[];
    brand?: string | null;
    storageType?: string | null;
    size?: string | null;
}