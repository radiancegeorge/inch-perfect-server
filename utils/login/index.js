const { getUser } = require("../registration");
const bcrypt = require("bcrypt");
const { encryptUser } = require("../jsonwebtoken");

const login = async (email, password) => {
  if (!email || !password) throw "email or password cannot be empty!";
  const user = await getUser(email, []);
  if (!user) throw "User not found!";
  const {
    password: hashedPassword,
    active,
    verified,
    first_name,
    last_name,
    id,
  } = user;
  const isPassword = await verifyHashedText(hashedPassword, password);
  if (!isPassword) throw "Wrong password!";
  checkActiveAndVerified(active, verified);

  //create token
  const token = encryptUser({
    ...user,
    password,
    id,
  });
  return {
    first_name,
    last_name,
    email,
    token,
  };
};

/**
 *
 * @param {string} hash
 * @param {string} text
 * @returns true or false
 */
const verifyHashedText = async (hash, text) => {
  const isText = await bcrypt.compare(text, hash);
  return isText;
};

/**
 *
 * @param {("1"|"2")} active
 * @param {("1"|"2")} verified
 */
const checkActiveAndVerified = (active, verified) => {
  if (active === "1") throw "Your account is not active";
  if (verified === "1") throw "Please verify your account";
};

module.exports = {
  checkActiveAndVerified,
  verifyHashedText,
  login,
};
