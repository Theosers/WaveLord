import { Schema, model, Document } from 'mongoose';

interface Review extends Document {
    productId: Schema.Types.ObjectId;
    name: string;
    rating: number;
    review: string;
    date: string;
}

const reviewSchema = new Schema<Review>({
    productId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    review: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default model<Review>('reviews', reviewSchema);
