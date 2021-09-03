const { Op } = require("sequelize");
const { v4 } = require("uuid");
const { Users, Products, Orders } = require("../../models");
const { getCoupon } = require("../coupons");
const { getUser } = require("../registration");
const createOrder = async (id, orderObject) => {
  //handle invalid fields
  const invalidKeys = ["total", "processing", "shipped", "delivered"];
  Object.keys(orderObject).forEach((key) => {
    if (invalidKeys.includes(key)) throw `invald field ${key}`;
  });
  orderObject.id = v4();
  const { currency } = await getUser(id);

  const arrayOfId = JSON.parse(testProduct || orderObject.product).map(
    (products) => products.id
  );
  //get products prices and verification
  const prices = await getOrderedProducts(arrayOfId).map((product) =>
    currency === "NGN" ? product.price_ngn : product.price_usd
  );
  let totalPrice = prices.reduce(
    (prevVal, currentVal) => Number(prevVal) + Number(currentVal),
    0
  );
  if (orderObject.coupon) {
    const { percentage_off } = await getCoupon(orderObject.coupon);
    totalPrice = totalPrice - (totalPrice * Number(percentage_off)) / 100;
  }
  if (orderObject.method === "MANUAL") {
    await addToOrder(orderObject);
  }
};

const addToOrder = async (orderObject) => {
  await Orders.create(orderObject);
  return true;
};

const getOrderedProducts = async (arrayOfId) => {
  return await Products.findAll({
    where: {
      id: {
        [Op.or]: arrayOfId,
      },
    },
  });
};

const testProduct = JSON.stringify([
  {
    id: "276b0250-05fa-11ec-bbde-01744762fce4",
  },
  {
    id: "9a26d530-05d2-11ec-9b10-0749ad05a6de",
  },
  {
    id: "3b57e5d0-05d2-11ec-a102-f17ad12f4502",
  },
  {
    id: "8a31cab0-05f8-11ec-8f55-c12fef5a281b",
  },
]);
