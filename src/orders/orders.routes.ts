import { Router } from "express";
import Handler from "express-async-handler";
import { completeOrder, getOrderById, getOrders } from "./orders.DAO";

const router = Router();

router.get("/", Handler(getOrders));
router.get("/:orderId", Handler(getOrderById));
router.post("/complete", Handler(completeOrder));

export default router;
