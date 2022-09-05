import { ProductsModel } from "./products.model";
import { CateogriesModel } from "../categories/categories.model";
import { errorLogger } from "../services/logs";
import productsDTO from "./products.DTO";

interface Product {
    name: string;
    description: string;
    price: number;
    stock: number;
    urlImage: string;
    categoryId: string;
}

const isValidCategoryId = async (id : string) : Promise<boolean> => {
    try{
        if(!id) return false;
        const cat = await CateogriesModel.findById(id);
        return cat != null;
    }
    catch(err:any){
        errorLogger(err);
        return false;
    }
};

export const isValidProductId = async (id: string): Promise<boolean> => {
    try{
        if(!id) return false;
        const prod = await ProductsModel.findById(id);
        return prod != null;
    }
    catch(err:any){
        errorLogger(err);
        return false;
    }
}

const getAllProducts = async () => {
    try{
        const products = await ProductsModel.find();
        return products.map(prod => productsDTO(prod));
    }
    catch(err: any){
        errorLogger(err);
        return 'There was an error trying to get products';
    }
}

const getProductsByCategory = async (categoryId: string) => {
    try{
        const products = await ProductsModel.find({categoryId});
        return products.map(prod => productsDTO(prod));
    }
    catch(err: any){
        errorLogger(err);
        return 'There was an error, invalid categoryId';
    }
}

const getProductById = async (id: string) => {
    try{
        const product = await ProductsModel.findById(id);
        return productsDTO(product);
    }
    catch(err: any){
        errorLogger(err);
        return 'There was an error, invalid productId';
    }
}

const createProduct = async (product:Product ) => {
    try{
        await ProductsModel.create(product);
        return 'Product created'
    }
    catch(err: any){
        errorLogger(err.message);
        return err.message;
    }
}

const updateProduct = async (id: string, body: any) => {
    try{
        const isValidPId = await isValidProductId(id);
        if(!isValidPId) return 'Invalid productId';
        if(body.categoryId){
            const isValidCarId = await isValidCategoryId(body.categoryId);
            if(!isValidCarId) return 'Invalid categoryId';
        }
        await ProductsModel.findByIdAndUpdate(id,body);
        return 'Product updated';
    }
    catch(err: any){
        errorLogger(err.message);
        return err.message;
    }
}

const deleteProduct = async (id: string) => {
    try{
        const isValidPId = await isValidProductId(id);
        if(!isValidPId) return 'Does not exists a product with this Id';
        await ProductsModel.findByIdAndDelete(id);
        return 'Product deleted';
    }
    catch(err: any){
        errorLogger(err);
        return 'Does not exists a product with this Id';
    }
}

const productsMongoController = {
    getAllProducts,
    getProductById,
    getProductsByCategory,
    createProduct,
    updateProduct,
    deleteProduct
}

export default productsMongoController;