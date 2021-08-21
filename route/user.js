const express = require("express");
const { register, verifyMail } = require("../controller/users/register");
const user = express.Router();

user.post("/register", register).get("/verify_email", verifyMail);

module.exports = user;
