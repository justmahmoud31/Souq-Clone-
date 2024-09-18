import mongoose, { Document, Schema, Types } from 'mongoose';
import 'dotenv/config';
import { config } from 'dotenv';
config();
interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    priceAfterOffer: number;
    stock?: number;
    sold?: number;
    rate?: number;
    imageCover: string;
    images: (string | null)[];
    category: (Types.ObjectId | null);
}
const productSchema = new mongoose.Schema<IProduct>(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        priceAfterOffer: { type: Number, required: true },
        stock: { type: Number },
        sold: { type: Number },
        rate: { type: Number },
        imageCover: { String },
        images: [{ type: String }],
        category: { type: Schema.Types.ObjectId, ref: 'Category', required: false },
    },
    {
        timestamps: false,
        versionKey: false,
    }
);

productSchema.post('init', function (doc: IProduct) {
    if (doc.imageCover) {
        doc.imageCover = process.env.BASEURL + '/uploads/products/' + doc.imageCover;
    }

    if (Array.isArray(doc.images)) {
        doc.images = doc.images.map(img =>
            img ? process.env.BASEURL + 'src/uploads/products/' + img : null
        );
    } else {
        doc.images = [];
    }
});
export const ProductModel = mongoose.model<IProduct>('Product', productSchema);
