import { Schema, model, Document } from 'mongoose';

interface SellerWallet extends Document {
    sellerId: string;
    amount: number;
    month: number;
    year: number;
}

const sellerWalletSchema = new Schema<SellerWallet>({
    sellerId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    }
}, { timestamps: true });

export default model<SellerWallet>('sellerWallets', sellerWalletSchema);
