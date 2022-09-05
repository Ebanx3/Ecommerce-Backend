import mongoose, { Schema, model } from "mongoose";
import { categoryCollectionName } from "../categories/categories.model";

export const ProductsCollectionName = 'product';

const urlImage = new Schema({
    url: {type: String}
},{
    versionKey: false,
    _id: false
})

interface CartDoc extends mongoose.Document {
    _id:string;
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryId: Schema.Types.ObjectId;
    urlImages: any
}

const productsSchema = new Schema<CartDoc>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    urlImages: [urlImage],
    categoryId:{
        type: Schema.Types.ObjectId,
        ref: categoryCollectionName,
        required:true,
    }
},
{
    versionKey:false,
    timestamps:true
});

export const ProductsModel = model(ProductsCollectionName, productsSchema);