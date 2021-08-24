const express = require("express");
const { loginUser } = require("../controller/users/login");
const { register, verifyMail } = require("../controller/users/register");
const { protect } = require("../middlewares/protect.middleware");
const user = express.Router();

user.get("/test", protect);
user.post("/register", register).get("/verify_email", verifyMail);
user.post("/login", loginUser);
module.exports = user;
