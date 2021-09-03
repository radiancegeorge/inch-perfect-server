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

  const prices = orderObject.product.map((orderProduct) => {
    const { id, unit } = orderProduct;
    const { price_ngn, price_usd } = (
      await Products.findOne({
        where: {
          id,
        },
      })
    ).dataValues;
    console.log(price_usd, price_ngn);
    const price = currency === "NGN" ? price_ngn : price_usd;
    return Number(unit) * Number(price);
  });
  console.log(prices, "prices");
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
    return await getSingleOrder(orderObject.id);
  }
  //handle transactions with automatic payments
};

const getSingleOrder = async (id) => {
  return await Orders.findOne({
    where: {
      id,
    },
  });
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
    unit: 4,
  },
  {
    id: "9a26d530-05d2-11ec-9b10-0749ad05a6de",
    unit: 5,
  },
  {
    id: "3b57e5d0-05d2-11ec-a102-f17ad12f4502",
    unit: 7,
  },
  {
    id: "8a31cab0-05f8-11ec-8f55-c12fef5a281b",
    unit: 8,
  },
]);
