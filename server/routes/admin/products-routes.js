const express = require("express");
const { upload } = require("../../helper/cloudinary");
const {
  handleImageUpload,
  addProduct,
  fetchProduct,
  editProduct,
  deleteProduct,
} = require("../../controller/admin/product-controllers");
const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/add",  addProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete",  deleteProduct);
router.get("/get",  fetchProduct);

module.exports = router;
