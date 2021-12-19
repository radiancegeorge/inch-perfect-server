const express = require("express");
const { makeOrder, setOrderStatus } = require("../controller/orders");
const { protect, adminProtect } = require("../middlewares/protect.middleware");

const orders = express.Router();

orders
  .post("/create_order", protect, makeOrder)
  .patch("/order_status", protect, adminProtect, setOrderStatus);

module.exports = orders;
