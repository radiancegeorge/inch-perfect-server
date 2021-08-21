const express = require("express");
const { register } = require("../controller/users/register");
const user = express.Router();

user.post("/", register);

module.exports = user;
