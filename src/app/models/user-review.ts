export type UserReviewModel = {
    id: string;
    productId: string;
    userId: string;
    userName: string;
    userImageUrl: string;
    rating: number; // 1 to 5
    title: string;
    comment: string;
    reviewDate: Date;
}


export type AddReviewParams = Pick<UserReviewModel, 'title' | 'rating' | 'comment'>;