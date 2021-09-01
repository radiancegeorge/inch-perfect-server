const express = require("express");
const { createCoupon, getCoupon } = require("../controller/coupons");
const { protect } = require("../middlewares/protect.middleware");
const coupons = express.Router();
coupons.get("/check", protect, getCoupon).post("/create", createCoupon);
module.exports = coupons;
