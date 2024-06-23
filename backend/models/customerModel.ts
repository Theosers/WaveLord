import { Schema, model, Document } from 'mongoose';

interface Customer extends Document {
    name: string;
    email: string;
    password: string;
    method: string;
}

const customerSchema = new Schema<Customer>({
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
    method: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default model<Customer>('customers', customerSchema);
