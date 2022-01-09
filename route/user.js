const express = require("express");
const { update } = require("../controller/users/addBillingInfo");
const { loginUser } = require("../controller/users/login");
const { patchUser, requestOtp } = require("../controller/users/patchUSer");
const { register, verifyMail } = require("../controller/users/register");
const { protect } = require("../middlewares/protect.middleware");
const user = express.Router();

user.get("/test", protect);
user.post("/register", register).get("/verify_email", verifyMail);
user
  .post("/login", loginUser)
  .post("/update_billing_info", protect, update)
  .patch("/", patchUser)
  .post("/otp", requestOtp);

module.exports = user;
