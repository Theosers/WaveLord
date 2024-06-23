import { Document, Schema, model, ObjectId } from 'mongoose';

export interface CardProduct extends Document {
    userId: ObjectId;
    productId: ObjectId;
    quantity: number;
}

const cardSchema = new Schema<CardProduct>({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    productId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

const cardModel = model<CardProduct>('cardProducts', cardSchema);
export default cardModel;
