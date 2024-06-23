import { Schema, model, Document } from 'mongoose';

interface SellerCustomerMsg extends Document {
    senderName: string;
    senderId: string;
    receverId: string;
    message: string;
    status: string;
}

const sellerCustomerMsgSchema = new Schema<SellerCustomerMsg>({
    senderName: {
        type: String,
        required: true
    },
    senderId: {
        type: String,
        required: true
    },
    receverId: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'unseen'
    }
}, { timestamps: true });

export default model<SellerCustomerMsg>('seller_customer_msgs', sellerCustomerMsgSchema);
