import { Schema, model, Document } from 'mongoose';

interface WithdrowRequest extends Document {
    sellerId: string;
    amount: number;
    status: string;
}

const withdrowSchema = new Schema<WithdrowRequest>({
    sellerId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    }
}, { timestamps: true });

export default model<WithdrowRequest>('withdrowRequest', withdrowSchema);
