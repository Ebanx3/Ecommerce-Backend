import { Request, Response } from "express";
import { ProductsModel } from "../products/products.model";
import { errorLogger } from "../services/logs";
import { OrdersModel } from "./oders.model";
import ordersDTO from "./orders.DTO";

const getOrders = async (req: Request, res: Response) => {
    try {
        const orders = await OrdersModel.find({});
        const ord = orders.map(ord => ordersDTO(ord))
        res.status(200).json({
            data: ord
        });
    }
    catch (err: any) {
        errorLogger(err.message);
        return res.status(400).json({
            data: 'Error getting orders'
        });
    }
};

const getOrderById = async (req: Request, res: Response) => {
    try {
        const { orderId } = req.params;
        const order = await OrdersModel.findById(orderId);
        res.status(200).json({
            data: ordersDTO(order)
        });
    }
    catch (err: any) {
        errorLogger(err.message);
        return res.status(400).json({
            data: 'An error ocurred triyng to get that order'
        });
    }
};

const completeOrder = async (req: Request, res: Response) => {
    try {
        const { orderId } = req.body;
        if (!isValidOrderId(orderId)) {
            res.status(400).json({
                data: 'Does not exists an order with that Id, or invalid'
            });
            return;
        }
        await OrdersModel.findByIdAndUpdate(orderId, { state: 'complete' });
        res.status(200).json({
            data: 'Order complete!'
        });
    }
    catch (err: any) {
        errorLogger(err.message);
        return res.status(400).json({
            data: 'An error ocurred trying to complete that order'
        });
    }
};

const isValidOrderId = async (id: string): Promise<boolean> => {
    try {
        if (!id) return false;
        const order = await OrdersModel.findById(id);
        return order != null;
    }
    catch (err: any) {
        errorLogger(err.message);
        return false;
    }
};

const setProductsFormat = async (products: any[]): Promise<any[]> => {
    const prodArray: any[] = [];
    for (let i = 0; i < products.length; i++) {
        const product = await ProductsModel.findById(products[i].productId);
        const newProd = {
            productId: product?._id,
            amount: products[i].amount,
            price: product?.price
        };
        prodArray.push(newProd);
    }
    return new Promise( resolve => resolve(prodArray))
}

export const createOrder = async (userId: string, products: any[]) => {
    try {
        let totalPrice = 0;
        const prodArray = await setProductsFormat(products)
        for(let prod of prodArray){
            totalPrice += prod.price * prod.amount;
        }
        
        const newOrder = {
            userId,
            items: prodArray,
            totalPrice
        };
        await OrdersModel.create(newOrder);
        return 'Orders created successfully';
    }
    catch (err: any) {
        console.log(err.message);
        errorLogger(err.message);
        return 'Failed to create order';
    }
}

const ordersMongoController = {
    getOrders,
    getOrderById,
    completeOrder
}

export default ordersMongoController;