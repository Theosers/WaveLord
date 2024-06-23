import { Schema, model, Document } from 'mongoose';

interface AdminSellerMsg extends Document {
    senderName: string;
    senderId: string;
    receverId: string;
    message: string;
    status: string;
}

const adminSellerMsgSchema = new Schema<AdminSellerMsg>({
    senderName: {
        type: String,
        required: true
    },
    senderId: {
        type: String,
        default: ''
    },
    receverId: {
        type: String,
        default: ''
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

export default model<AdminSellerMsg>('seller_admin_messages', adminSellerMsgSchema);
