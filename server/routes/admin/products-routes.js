import express from "express";
import { upload } from "../../helper/cloudinary.js";
import {
  handleImageUpload,
  addProduct,
  fetchProduct,
  editProduct,
  deleteProduct,
} from "../../controller/admin/product-controllers.js";
const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/add", addProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete", deleteProduct);
router.get("/get", fetchProduct);

export default router;
