import { categoriesFactory } from "./cateogires.factory";
import { Request, Response } from "express";

export const getAllCategories = async (req: Request, res: Response) => {
  const categories = await categoriesFactory().getAllCategories();
  res.json({
    data: categories,
  });
};

export const getCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await categoriesFactory().getCategoryById(id);
  category == "Category not found, invalid Id"
    ? res.status(400)
    : res.status(200);
  res.json({
    data: category,
  });
};

export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;

  const newCategory = await categoriesFactory().createCategory(name);
  if (newCategory == "Name field is required") {
    res.status(400).json({
      data: newCategory,
    });
    return;
  } else {
    res.status(200).json({
      data: `New category created with name ${name}`,
    });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  const updatedCat = await categoriesFactory().updateCategory(id, name);
  if (updatedCat == "Category not found, invalid Id") res.status(400);
  else if (updatedCat == "Name field is required") res.status(400);
  else res.status(200);
  res.json({
    data: updatedCat,
  });
};
export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedCat = await categoriesFactory().deleteCategory(id);
  deletedCat == "Category not found, invalid Id"
    ? res.status(400)
    : res.status(200);
  res.json({
    data: deletedCat,
  });
};
