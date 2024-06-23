import { Schema, model, Document, Types } from 'mongoose';

interface Product {
    productId: Types.ObjectId;
    name: string;
    quantity: number;
    price: number;
}

interface AuthorOrder extends Document {
    orderId: Types.ObjectId;
    sellerId: Types.ObjectId;
    products: Product[];
    price: number;
    payment_status: string;
    shippingInfo: string;
    delivery_status: string;
    date: string;
}

const productSchema = new Schema<Product>({
    productId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const authorOrderSchema = new Schema<AuthorOrder>({
    orderId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    sellerId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    products: {
        type: [productSchema],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    payment_status: {
        type: String,
        required: true
    },
    shippingInfo: {
        type: String,
        required: true
    },
    delivery_status: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default model<AuthorOrder>('authorOrders', authorOrderSchema);
