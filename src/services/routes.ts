import { Router } from "express";
import categoriesRouter from "../categories/categories.routes";
import usersRouter from "../users/users.routes";
import productsRouter from "../products/products.routes";
import cartRouter from "../cart/cart.routes";
import imagesRouter from "../images/images.routes";
import ordersRouter from "../orders/orders.routes";

const router = Router();

router.use("/categories", categoriesRouter);
router.use("/users", usersRouter);
router.use("/products", productsRouter);
router.use("/cart", cartRouter);
router.use("/images", imagesRouter);
router.use("/orders", ordersRouter);
// router.get('/info', infoAboutServer);

export default router;
