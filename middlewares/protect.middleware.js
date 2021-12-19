const { verifyUser } = require("../utils/jsonwebtoken");

const protect = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization)
      res.status(401).json({
        error: "unauthorized!",
      });
    if (!authorization.toLowerCase().includes("bearer"))
      res.status(401).json({
        error: "Invalid auth type",
      });

    //decrypt
    const token = authorization.split(" ")[1];
    const user = verifyUser(token);
    if (!user)
      res.status(401).json({
        error: "unauthorized!",
      });
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    next("unauthorized, please make sure tokens are provided!");
  }
};

const adminProtect = (req, res, next) => {
  if (req.user.email.toLowerCase() !== process.env.admin_email)
    throw "NO ACCESS!";
  next();
};
module.exports = {
  protect,
  adminProtect,
};
