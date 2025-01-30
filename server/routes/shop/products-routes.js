import express from "express";

import {
  getFilterProducts,
  getProductDetails,
} from "../../controller/shop/product-controller.js";
const router = express.Router();

router.get("/get", getFilterProducts);
router.get("/get/:id", getProductDetails);

export default router;
