const { v5, v4 } = require("uuid");
const { Coupons } = require("../../models");
const generateCoupon = async (percentage_off, allowed_usage) => {
  const nameSpace = v4();
  const id = v5(percentage_off, nameSpace).split("-")[2];
  const data = {
    id,
    percentage_off,
    allowed_usage,
  };
  await Coupons.create(data);
  return await getCoupon(id);
};
const getCoupon = async (id) => {
  const coupon = (
    await Coupons.findOne({
      where: {
        id,
      },
    })
  )?.dataValues;
  if (!coupon) throw "Invalid Coupon!";
  if (coupon.allowed_usage <= coupon.usage_count) throw "Expired Coupon";
  return coupon;
};
const addUsage = async (id) => {
  await Coupons.increment("usage_count", {
    by: 1,
    where: {
      id,
    },
  });
  return { ...(await getCoupon(id)) };
};
addUsage("56df")
  .then((item) => console.log(item))
  .catch((err) => console.log(err));
module.exports = {
  generateCoupon,
  getCoupon,
  addUsage,
};
