const asyncHandler = require("express-async-handler");
const { login } = require("../../utils/login");

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const isUser = await login(email, password);
    if (!isUser) throw "unable to login!";
    res.status(200).json(isUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = {
  loginUser,
};
