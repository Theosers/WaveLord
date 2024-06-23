import { Schema, model, Document } from 'mongoose';

interface Stripe extends Document {
    sellerId: Schema.Types.ObjectId;
    stripeId: string;
    code: string;
}

const stripeSchema = new Schema<Stripe>({
    sellerId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    stripeId: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default model<Stripe>('stripes', stripeSchema);
