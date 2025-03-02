import express from "express";
import {
  capturePayment,
  createOrder,
  getAllOrdersByUser,
  getOrdersDetails,
} from "../../controller/shop/order-controller.js";
const router = express.Router();

router.post("/create", createOrder);
router.post("/capture", capturePayment);
router.get("/list/:userId", getAllOrdersByUser);
router.get("/details/:id", getOrdersDetails);

export default router;
