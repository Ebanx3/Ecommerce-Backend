import { Router } from "express";
import Handler from "express-async-handler";
import { getCart, addProduct, removeProduct, submitCart } from "./cart.DAO";
import { loggedUser } from "../services/middlewares";

const router = Router();

router.get("/", loggedUser, Handler(getCart));
router.post("/add", loggedUser, Handler(addProduct));
router.post("/remove", loggedUser, Handler(removeProduct));
router.post("/submit", loggedUser, Handler(submitCart));

export default router;
