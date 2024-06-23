import { Schema, model, Document } from 'mongoose';

interface Wishlist extends Document {
    userId: string;
    productId: string;
    name: string;
    price: number;
    slug: string;
    discount: number;
    image: string;
    rating: number;
}

const wishlistSchema = new Schema<Wishlist>({
    userId: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

export default model<Wishlist>('wishlists', wishlistSchema);
