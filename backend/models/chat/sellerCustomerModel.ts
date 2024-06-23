import { Schema, model, Document } from 'mongoose';

export interface Friend {
    // Ajoutez ici les propriétés de chaque ami, par exemple :
    fdId: string;
    name: string;
    image: string;
}

export interface SellerCustomer extends Document {
    myId: string;
    myFriends: Friend[];
}

const friendSchema = new Schema<Friend>({
    fdId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ''
    }
});

const sellerCustomerSchema = new Schema<SellerCustomer>({
    myId: {
        type: String,
        required: true
    },
    myFriends: {
        type: [friendSchema],
        default: []
    }
}, { timestamps: true });

export default model<SellerCustomer>('seller_customers', sellerCustomerSchema);
