import express from "express";
import {
  getAllOrdersOffAllUser,
  getOrdersDetailsForAdmin,
  updateOrderStatus
} from "../../controller/admin/order-controller.js";
const router = express.Router();


router.get("/get", getAllOrdersOffAllUser);
router.get("/details/:id", getOrdersDetailsForAdmin);
router.put("/update/:id", updateOrderStatus);

export default router;
