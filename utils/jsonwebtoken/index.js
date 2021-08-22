require("dotenv").config();
const jwt = require("jsonwebtoken");

const encryptUser = (data) => {
  const token = jwt.sign(data, process.env.jsonwebtokenkey);
  return token;
};

const verifyUser = (token) => {
  const user = jwt.verify(token, process.env.jsonwebtokenkey);
  return user;
};

module.exports = {
  verifyUser,
  encryptUser,
};
