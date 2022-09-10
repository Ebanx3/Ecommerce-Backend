import { Router } from "express";
import Handler from "express-async-handler";
import {
  getAllProducts,
  getProductsByCategory,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} from "./products.DAO";
import { loggedUser, itsAdmin } from "../services/middlewares";

const router = Router();

router.get("/", Handler(getAllProducts));
router.get("/category/:categoryId", Handler(getProductsByCategory));
router.get("/:id", Handler(getProductById));
router.post("/", loggedUser, itsAdmin, Handler(createProduct));
router.put("/:id", loggedUser, itsAdmin, Handler(updateProduct));
router.delete("/:id", loggedUser, itsAdmin, Handler(deleteProduct));

export default router;
