import express from "express";
import {
  searchProduct
} from "../../controller/shop/search-controller.js";

const router = express.Router();

router.get("/:keyword", searchProduct);


export default router;