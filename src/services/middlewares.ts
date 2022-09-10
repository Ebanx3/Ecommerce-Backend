import { NextFunction, Request, Response } from "express";
import { isNamedExportBindings } from "typescript";
import { UserDoc } from "../users/users.model";

export const itsAdmin = (req: Request, res: Response, next: NextFunction) => {
  const { admin }: any = req.user;
  admin ? next() : res.status(401).json({ data: "Unauthotized" });
};

export const loggedUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  !req.user ? res.status(401).json({ data: "Unauthorized" }) : next();
};
