const { Op } = require("sequelize");
const { v4 } = require("uuid");
const { Products, Orders } = require("../../models");
const { getCoupon, addUsage } = require("../coupons");
const sendMail = require("../mailer");
const { getUser } = require("../registration");

const createOrder = async (id, object) => {
  //handle invalid fields
  const invalidKeys = ["total", "processing", "shipped", "delivered"];
  Object.keys(object).forEach((key) => {
    if (invalidKeys.includes(key)) throw `invald field ${key}`;
  });

  object.id = v4();
  const {
    first_name,
    last_name,
    country,
    state,
    town,
    street,
    email,
    phone_number,
    postal_code,
  } = await getUser(id);
  const orderObject = {
    ...object,
    first_name,
    last_name,
    country,
    state,
    town,
    street,
    email,
    phone_number,
    postal_code,
  };
  orderObject.currency = object.currency;
  const prices = orderObject.product.map(async (orderProduct) => {
    const { id, unit } = orderProduct;
    const { price_ngn, price_usd } = (
      await Products.findOne({
        where: {
          id,
        },
      })
    ).dataValues;
    const price = currency === "NGN" ? price_ngn : price_usd;
    return Number(unit) * Number(price);
  });
  let totalPrice = await prices.reduce(async (prevVal, currentVal) => {
    return Number(await prevVal) + Number(await currentVal);
  }, 0);
  if (orderObject.coupon) {
    const { percentage_off } = await getCoupon(orderObject.coupon);
    totalPrice = totalPrice - (totalPrice * Number(percentage_off)) / 100;
    orderObject.total = totalPrice;
    try {
      await addUsage(orderObject.coupon);
    } catch (err) {
      console.log(err);
    }
  }

  orderObject.total = totalPrice;

  if (orderObject.method === "MANUAL") {
    await addToOrder(orderObject);
    const isAdded = await getSingleOrder(orderObject.id);
    if (!isAdded) throw "an error with adding to order";
    return await getSingleOrder(orderObject.id);
  }
  //handle transactions with automatic payments

  if (!orderObject.referrence || orderObject.referrence === "")
    throw "Invalid Reference";
  //after successful payments;
  await addToOrder(orderObject);
  await setProcessing(orderObject.id);

  //remember to send an email confirming order later******
  sendMail({
    html: "your order is",
    to: (await getUser(id)).email,
  });

  return await getSingleOrder(orderObject.id);
};

const getSingleOrder = async (
  id,
  exclude = ["delivered", "processing", "method", "shipped"]
) => {
  return await Orders.findOne({
    where: {
      id,
    },
    attributes: {
      exclude,
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

const setProcessing = async (id) => {
  const { processing } = (
    await Orders.findOne({
      where: {
        id,
      },
    })
  ).dataValues;
  if (!processing) throw "cannot find order!";
  await Orders.update(
    {
      processing: processing === "1" ? "2" : "1",
    },
    {
      where: {
        id,
      },
    }
  );
};
const setDelivered = async (id) => {
  const { delivered } = (
    await Orders.findOne({
      where: {
        id,
      },
    })
  ).dataValues;
  if (!delivered) throw "cannot find order!";
  await Orders.update(
    {
      delivered: delivered === "1" ? "2" : "1",
    },
    {
      where: {
        id,
      },
    }
  );
};
const setShipped = async (id) => {
  const { shipped } = (
    await Orders.findOne({
      where: {
        id,
      },
    })
  ).dataValues;
  if (!shipped) throw "cannot find order!";
  await Orders.update(
    {
      shipped: shipped === "1" ? "2" : "1",
    },
    {
      where: {
        id,
      },
    }
  );
};

// const testOrder = JSON.stringify([
//   {
//     id: "276b0250-05fa-11ec-bbde-01744762fce4",
//     unit: 4,
//     product: ,
//     country: "nigeria",
//     state: "imo",
//     town: "world bank",
//   },
// ]);
// console.log(testOrder);
module.exports = {
  addToOrder,
  getOrderedProducts,
  getSingleOrder,
  createOrder,
  setShipped,
  setDelivered,
  setProcessing,
};
