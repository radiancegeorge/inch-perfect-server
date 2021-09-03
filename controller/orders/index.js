const asyncHandler = require("express-async-handler");
const {
  createOrder,
  setDelivered,
  setProcessing,
  setShipped,
} = require("../../utils/orders");
const { getUser } = require("../../utils/registration");

const makeOrder = asyncHandler(async (req, res, next) => {
  const { useDefault } = req.body;
  const defaultUserData = await getUser(req.user.id, [
    "password",
    "currency",
    "active",
    "verified",
    "verification_id",
    "id",
    "createdAt",
    "updatedAt",
  ]);
  const preOrderObject = { ...req.body, ...(useDefault && defaultUserData) };
  console.log(preOrderObject);
  const order = await createOrder(req.user.id, preOrderObject);
  if (!order) throw "error making order";
  res.status(200).json(order);
});

const setOrderStatus = asyncHandler(async (req, res, next) => {
  const { processing, shipped, delivered } = req.query;
  let response;
  if (delivered) {
    response = await setDelivered(delivered);
    res.status(200).json(response);
    return;
  }
  if (shipped) {
    response = await setShipped(shipped);
    res.status(200).json(response);
    return;
  }
  if (processing) {
    response = await setProcessing(processing);
    res.status(200).json(response);
    return;
  }
  throw "Nothing to update!";
});
module.exports = {
  makeOrder,
  setOrderStatus,
};
