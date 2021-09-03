const asyncHandler = require("express-async-handler");
const { addUserBillingInfo } = require("../../utils/user");

const update = asyncHandler(async (req, res, next) => {
  const isAdded = await addUserBillingInfo(req.user.id, req.body);
  res.status(200).json({ ...isAdded });
});

module.exports = {
  update,
};
