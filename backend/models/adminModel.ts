import { Schema, model, Document } from 'mongoose';

interface Admin extends Document {
    name: string;
    email: string;
    password: string;
    image: string;
    role: string;
}

const adminSchema = new Schema<Admin>({
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
        required: true
    },
    image: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'admin'
    }
});

export default model<Admin>('admins', adminSchema);
