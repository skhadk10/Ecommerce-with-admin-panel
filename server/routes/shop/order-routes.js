import express from "express";
import { capturePayment, createOrder } from "../../controller/shop/order-controller.js";
const router = express.Router();

router.post("/create", createOrder);
router.post("/capture", capturePayment);

export default router;
