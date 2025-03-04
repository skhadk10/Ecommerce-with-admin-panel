import express from "express";
import {
  getAllOrdersOffAllUser,
  getOrdersDetailsForAdmin
} from "../../controller/admin/order-controller.js";
const router = express.Router();


router.get("/get", getAllOrdersOffAllUser);
router.get("/details/:id", getOrdersDetailsForAdmin);

export default router;
