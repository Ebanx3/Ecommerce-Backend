import { Router } from "express";
import Handler from 'express-async-handler';
import { getAllProducts, getProductsByCategory, createProduct , getProductById, updateProduct,  deleteProduct} from "./products.DAO";

const router = Router();

router.get('/', Handler(getAllProducts));
router.get('/category/:categoryId',Handler(getProductsByCategory));
router.get('/:id',Handler(getProductById));
router.post('/', Handler(createProduct));
router.put('/:id',Handler(updateProduct));
router.delete('/:id',Handler(deleteProduct));

export default router;