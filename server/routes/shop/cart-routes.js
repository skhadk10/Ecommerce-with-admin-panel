import express from "express";
import {
  addToCart,
  fetchCartItems,
  updateCartItemQty,
  deleteCartItem,
} from "../../controller/shop/cart-Controller.js";
const router = express.Router();

router.post("/add", addToCart);
router.get("/get/:userId", fetchCartItems);
router.put("/update-cart", updateCartItemQty);
router.delete("/:userId/:productId", deleteCartItem);

export default router;
