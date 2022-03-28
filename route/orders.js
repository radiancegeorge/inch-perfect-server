const express = require("express");
const {
  makeOrder,
  setOrderStatus,
  getOrders,
} = require("../controller/orders");
const { protect, adminProtect } = require("../middlewares/protect.middleware");

const orders = express.Router();

orders
  .post("/create_order", makeOrder)
  .patch("/order_status", protect, adminProtect, setOrderStatus)
  .get("/", protect, adminProtect, getOrders);

module.exports = orders;
