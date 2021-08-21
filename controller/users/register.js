const asyncHandler = require("express-async-handler");
const { registration } = require("../../utils/registration");

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

module.exports = {
  register,
};
