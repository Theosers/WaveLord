import { Schema, model, Document, Types } from 'mongoose';

interface ShippingInfo {
    [key: string]: any; // Vous pouvez définir une interface plus détaillée en fonction de la structure de shippingInfo
}

interface Product {
    productId: Schema.Types.ObjectId;
    name: string;
    quantity: number;
    price: number;
}

interface CustomerOrder extends Document {
    customerId: Types.ObjectId;
    products: Product[];
    price: number;
    payment_status: string;
    shippingInfo: ShippingInfo;
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

const customerOrderSchema = new Schema<CustomerOrder>({
    customerId: {
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
        type: Object,
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

export default model<CustomerOrder>('customerOrders', customerOrderSchema);
