import { Schema, model, Document } from 'mongoose';

interface Product extends Document {
    sellerId: Schema.Types.ObjectId;
    name: string;
    slug: string;
    category: string;
    brand: string;
    price: number;
    stock: number;
    discount: number;
    description: string;
    shopName: string;
    images: string[];
    rating: number;
}

const productSchema = new Schema<Product>({
    sellerId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    shopName: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    rating: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

productSchema.index({
    name: 'text',
    category: 'text',
    brand: 'text',
    description: 'text'
}, {
    weights: {
        name: 5,
        category: 4,
        brand: 3,
        description: 2
    }
});

export default model<Product>('products', productSchema);
