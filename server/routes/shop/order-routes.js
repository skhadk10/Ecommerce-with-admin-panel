const express = require("express");
const { createOrder } = require("../../controller/shop/order-controller");
const router = express.Router();

router.post("/create", createOrder);

module.exports = router;
