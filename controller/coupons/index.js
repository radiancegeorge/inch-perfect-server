const asyncHandler = require("express-async-handler");
const {
  generateCoupon,
  addUsage,
  getCoupon: fetchCoupon,
} = require("../../utils/coupons");

const getCoupon = asyncHandler(async (req, res, next) => {
  const { id } = req.body;
  const coupon = await fetchCoupon(id);
  res.status(200).json(coupon);
});

const createCoupon = asyncHandler(async (req, res, next) => {
  const { percentage_off, allowed_usage } = req.body;
  const coupon = await generateCoupon(percentage_off, allowed_usage);
  res.status(200).json(coupon);
});
const addToUsage = asyncHandler(async (req, res, next) => {
  const { id } = req.body;
  const coupon = await addUsage(id);
  res.status(200).json(coupon);
});
module.exports = {
  getCoupon,
  createCoupon,
  addToUsage,
};
