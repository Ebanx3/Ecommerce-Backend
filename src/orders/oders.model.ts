import { Schema, model } from "mongoose";
import { UserCollectionName } from "../users/users.model";
import { ProductsCollectionName } from "../products/products.model";

export const OrdersCollectionName = 'order';

enum orderStates {
    generated = 'generated',
    paidOut = 'paidOut',
    send = 'send',
    complete = 'complete'
}

const productsInOrderSchema = new Schema({
    productId:{
        type: Schema.Types.ObjectId,
        ref: ProductsCollectionName,
        required: true,
    },
    amount: { type: Number, default: 1 },
    price: {type: Number, required: true}
},{
    versionKey: false,
    _id: false
})

const orderSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref: UserCollectionName,
        required:true
    },
    items:[productsInOrderSchema],
    state: { type: String, enum: orderStates, default: 'generated' },
    totalPrice: {type: Number, required: true}
},{
    timestamps: true,
    versionKey: false
})

export const OrdersModel = model(OrdersCollectionName, orderSchema);