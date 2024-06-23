import { Schema, model, Document } from 'mongoose';

interface MyShopWallet extends Document {
    amount: number;
    month: number;
    year: number;
}

const myShopWalletSchema = new Schema<MyShopWallet>({
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

export default model<MyShopWallet>('myShopWallets', myShopWalletSchema);
