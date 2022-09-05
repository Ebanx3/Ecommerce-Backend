import { Router } from "express";
import Handler from 'express-async-handler';
import { getCart,addProduct,removeProduct, loggedUser, submitCart } from "./cart.DAO";

const router = Router();

router.get('/', loggedUser,Handler(getCart));
router.post('/add', loggedUser, Handler(addProduct));
router.post('/remove', loggedUser,Handler(removeProduct));
router.post('/submit',loggedUser, Handler(submitCart));

export default router;