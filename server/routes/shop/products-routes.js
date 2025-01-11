const express = require("express");

const {
  getFilterProducts,
} = require("../../controller/shop/product-controller");
const router = express.Router();

router.get("/get", getFilterProducts);

module.exports = router;
