require("dotenv").config();
const asyncHandler = require("express-async-handler");
const { registration, verifyEmail } = require("../../utils/registration");
const { app_url } = process.env;
const register = asyncHandler(async (req, res, next) => {
  const data = req.body;
  try {
    const newUser = await registration(data);
    res.status(200).json({
      message: "successfully registered!",
      data: { ...newUser },
    });
  } catch (error) {
    next(error);
  }
});

const verifyMail = asyncHandler(async (req, res, next) => {
  const { code, email } = req.query;
  try {
    const user = await verifyEmail(email, code);
    if (user) res.status(200).redirect(app_url);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
module.exports = {
  register,
  verifyMail,
};
