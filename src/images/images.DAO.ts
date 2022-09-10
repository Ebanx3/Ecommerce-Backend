import { Request, Response } from "express";
import { imagesFactory } from "./images.factory";

export const uploadImage = async (req: Request, res: Response) => {
  await imagesFactory()?.uploadImage(req, res);
};

export const getImage = async (req: Request, res: Response) => {
  await imagesFactory()?.getImage(req, res);
};

export const deleteImage = async (req: Request, res: Response) => {
  await imagesFactory()?.deleteImage(req, res);
};
