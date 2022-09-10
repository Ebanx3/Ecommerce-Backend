import { cartFactory } from "./cart.factory";
import { Request, Response } from "express";

export const getCart = async (req: Request, res: Response) => {
  await cartFactory()?.getCart(req, res);
};

export const addProduct = async (req: Request, res: Response) => {
  await cartFactory()?.addProduct(req, res);
};

export const removeProduct = async (req: Request, res: Response) => {
  await cartFactory()?.removeProduct(req, res);
};

export const submitCart = async (req: Request, res: Response) => {
  await cartFactory()?.submitCart(req, res);
};
