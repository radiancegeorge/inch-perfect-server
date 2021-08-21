require("dotenv").config();
const { Op } = require("sequelize");
const { Users } = require("../../models");
const bcrypt = require("bcrypt");
const { salt } = process.env;
const uuid = require("uuid").v1;

/**
 *
 * @param {object} data
 * @returns new user object
 */
const registration = async (data) => {
  const { email } = data;
  if (!data.first_name) throw " first name cannot be undefined";
  if (!data.last_name) throw " last name cannot be undefined";
  if (!data.password) throw " password name cannot be undefined";
  if (!data.email) throw " email name cannot be undefined";

  const isMailInUse = await checkEmail(email);
  if (isMailInUse) throw "Email already in use!";
  try {
    await Users.create({
      ...data,
      password: await hashText(data.password),
      id: uuid(),
    });
    return (await getUser(email)).dataValues;
  } catch (error) {
    throw " error registering account";
  }
};

/**
 *
 * @param {string} email
 * @returns returns user
 */
const checkEmail = async (email) => {
  return await Users.findOne({
    where: {
      email: {
        [Op.like]: `%${email}%`,
      },
    },
    attributes: {
      include: ["email"],
    },
  });
};
/**
 *
 * @param {string} text
 * @returns hashed string
 */
const hashText = async (text, defaultSalt = Number(salt)) => {
  try {
    const hashed = await bcrypt.hash(text, defaultSalt);
    return hashed;
  } catch (error) {
    console.log(error);
    throw "Password Error";
  }
};
/**
 *
 * @param {string} data
 * @param {array} exclude
 * @returns matching user
 */
const getUser = async (data, exclude = ["password"]) => {
  const user = await Users.findOne({
    where: {
      [Op.or]: [
        {
          email: {
            [Op.like]: `%${data}%`,
          },
        },
        {
          id: {
            [Op.like]: `%${data}%`,
          },
        },
      ],
    },
    attributes: {
      exclude,
    },
  });
  return user;
};

// getUser("radiancegeorge@gmail.com").then((e) => console.log(e?.dataValues));

module.exports = {
  getUser,
  hashText,
  checkEmail,
  registration,
};
