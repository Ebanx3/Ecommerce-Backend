import { Schema, model } from "mongoose";
import { UserCollectionName } from "../users/users.model";
import { ProductsCollectionName } from "../products/products.model";

export const CartCollectionName = 'cart';

const productItem = new Schema({
    productId:{
        type: Schema.Types.ObjectId,
        ref: ProductsCollectionName,
        required: true,
    },
    amount: { type: Number, default: 1 },
    },{ _id: false }
);

export const CartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: UserCollectionName,
        required: true,
    },
    products: [productItem]
}, {
    versionKey: false,
    timestamps: true,
});

export const CartModel = model(CartCollectionName,CartSchema);
