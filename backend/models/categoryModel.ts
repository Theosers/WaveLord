import { Schema, model, Document } from 'mongoose';

interface Category extends Document {
    name: string;
    image: string;
    slug: string;
}

const categorySchema = new Schema<Category>({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    }
}, { timestamps: true });

categorySchema.index({
    name: 'text'
});

export default model<Category>('categories', categorySchema);
