import { Router } from "express";
import Handler from 'express-async-handler';
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from "./categories.DAO";

const router = Router();

router.get('/', Handler(getAllCategories));
router.get('/:id',Handler(getCategoryById));
router.post('/',Handler(createCategory));
router.put('/:id',Handler(updateCategory));
router.delete('/:id',Handler(deleteCategory));

export default router;