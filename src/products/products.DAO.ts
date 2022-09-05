import { productsFactory } from "./products.factory";
import { Request, Response, NextFunction } from "express";

export const getAllProducts = async (req: Request, res: Response) => {
    const products = await productsFactory()?.getAllProducts();
    res.json(
        {
            data: products
        }
    )
};

export const getProductsByCategory = async (req: Request, res: Response) => {
    const { categoryId } = req.params;
    const products = await productsFactory()?.getProductsByCategory(categoryId);
    res.json({
        data: products
    })
};

export const getProductById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await productsFactory()?.getProductById(id);
    res.json({
        data: product
    })
};

export const createProduct = async (req: Request, res: Response) => {
    const { name, description, stock, price, urlImage, categoryId } = req.body;
    const product = { name, description, stock, price, urlImage, categoryId };
    const newProduct = await productsFactory()?.createProduct(product);
    newProduct == 'Product created' ? res.status(201) : res.status(400);
    res.json({
        data: newProduct
    });
};

export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!req.body.name && !req.body.description && !req.body.stock && !req.body.price && !req.body.urlImage && !req.body.categoryId) {
        res.status(400).json({
            data: 'The body have no fields to update'
        })
        return;
    }
    const updatedProduct = await productsFactory()?.updateProduct(id, req.body);
    res.json({
        data: updatedProduct
    })
};

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const dP = await productsFactory()?.deleteProduct(id);
    dP == 'Does not exists a product with this Id' ? res.status(400) : res.status(200);
    res.json({
        data:dP
    })
}