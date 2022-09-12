import { CartModel } from "./cart.model";
import { Request, Response } from "express";
import { errorLogger } from "../services/logs";
import { isValidProductId } from "../products/products.contrMongo";
import { createOrder } from "../orders/order.contrMongo";

const getCart = async (req: Request, res: Response) => {
  try {
    const { user }: any = req;
    const cart = await CartModel.find({ userId: user?._id });
    res.status(200).json({
      data: cart[0],
    });
  } catch (err: any) {
    errorLogger(err.message);
    res.status(400).json({
      data: "Failed trying to get cart",
    });
  }
};

const addProduct = async (req: Request, res: Response) => {
  try {
    const { user }: any = req;
    const isValidPid = await isValidProductId(req.body.productId);
    if (!isValidPid) {
      res.status(400).json({
        data: "Invalid productId",
      });
      return;
    }
    const cart = await CartModel.find({ userId: user?._id });
    const productsUpdated = cart[0].products.slice();
    const index = productsUpdated.findIndex(
      (prod) => prod.productId == req.body.productId
    );
    if (index < 0) {
      productsUpdated.push(req.body);
    } else {
      productsUpdated[index].amount += req.body.amount;
    }
    const cartUpdated = await CartModel.findByIdAndUpdate(
      cart[0]._id.toString(),
      { products: productsUpdated },
      { new: true }
    );
    res.status(200).json({
      data: "Products added",
      cart: cartUpdated,
    });
  } catch (err: any) {
    errorLogger(err.message);
    return res.status(400).json({
      data: "Failed trying to add a product",
    });
  }
};

const removeProduct = async (req: Request, res: Response) => {
  try {
    const { user }: any = req;
    const isValidPid = await isValidProductId(req.body.productId);
    if (!isValidPid) {
      res.status(400).json({
        data: "Invalid productId",
      });
      return;
    }
    const cart = await CartModel.find({ userId: user?._id });
    const productsUpdated = cart[0].products.slice();
    const index = productsUpdated.findIndex(
      (prod) => prod.productId == req.body.productId
    );
    if (index >= 0) {
      if (
        !req.body.amount ||
        productsUpdated[index].amount <= req.body.amount
      ) {
        productsUpdated.splice(index, 1);
      } else {
        productsUpdated[index].amount -= req.body.amount;
      }
    } else {
      res.status(400).json({
        data: "Does not exists product in the cart with that ID",
      });
      return;
    }
    const cartUpdated = await CartModel.findByIdAndUpdate(
      cart[0]._id.toString(),
      { products: productsUpdated },
      { new: true }
    );
    res.status(200).json({
      msg: "Products deleted",
      cart: cartUpdated,
    });
  } catch (err: any) {
    errorLogger(err.message);
    res.status(400).json({
      data: "Failed to remove product",
    });
  }
};

const submitCart = async (req: Request, res: Response) => {
  try {
    const { user }: any = req;
    const cart = await CartModel.find({ userId: user?._id });
    const products = cart[0].products.slice();
    if (products.length == 0) {
      res.status(400).json({
        data: "Can not create an order with an empty cart",
      });
      return;
    }
    await CartModel.findByIdAndUpdate(cart[0]._id, { products: [] });
    const resu = await createOrder(user?._id, products);
    res.status(200).json({
      data: resu,
    });
  } catch (err: any) {
    errorLogger(err.message);
  }
};

const ControllerMongoCart = {
  getCart,
  addProduct,
  removeProduct,
  submitCart,
};

export default ControllerMongoCart;
