import { ordersFactory } from "./orders.Factory";
import { Request, Response, NextFunction } from "express";

export const getOrders = async (req: Request, res: Response) => {
  await ordersFactory()?.getOrders(req, res);
};

export const getOrderById = async (req: Request, res: Response) => {
  await ordersFactory()?.getOrderById(req, res);
};

export const completeOrder = async (req: Request, res: Response) => {
  await ordersFactory()?.completeOrder(req, res);
};
