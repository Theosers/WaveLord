import { Schema, model, Document, Types } from 'mongoose';

interface Banner extends Document {
    productId: Types.ObjectId;
    banner: string;
    link: string;
}

const bannerSchema = new Schema<Banner>({
    productId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    banner: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default model<Banner>('banners', bannerSchema);
