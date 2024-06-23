import { Schema, model, Document } from 'mongoose';

interface ShopInfo {
    [key: string]: any;
}

export interface Seller extends Document {
    name: string;
    email: string;
    password: string;
    role: string;
    status: string;
    payment: string;
    method: string;
    image: string;
    shopInfo: ShopInfo;
}

const sellerSchema = new Schema<Seller>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        default: 'seller'
    },
    status: {
        type: String,
        default: 'pending'
    },
    payment: {
        type: String,
        default: 'inactive'
    },
    method: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ''
    },
    shopInfo: {
        type: Object,
        default: {}
    }
}, { timestamps: true });

sellerSchema.index({
    name: 'text',
    email: 'text'
}, {
    weights: {
        name: 5,
        email: 4
    }
});

export default model<Seller>('sellers', sellerSchema);
