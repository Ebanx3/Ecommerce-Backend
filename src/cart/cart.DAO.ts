import { cartFactory } from "./cart.factory";
import { Request, Response, NextFunction } from "express";

export const getCart = async(req: Request, res:Response) => {
    await cartFactory()?.getCart(req,res);
};

export const addProduct = async (req: Request, res: Response) => {
    await cartFactory()?.addProduct(req,res);
};

export const removeProduct = async (req: Request, res : Response) => {
    await cartFactory()?.removeProduct(req,res);
};

export const submitCart = async (req: Request, res : Response) => {
    await cartFactory()?.submitCart(req, res);
};

export const loggedUser = async (req: Request, res: Response, next: NextFunction) => {
    !req.user ? res.status(401).json({ data: 'Unauthorized'}):  next();
};