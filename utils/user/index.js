const { Op } = require("sequelize");
const { Users } = require("../../models");
const { getUser } = require("../registration");

const addUserBillingInfo = async (id, billingObject) => {
  const notAccepted = [
    "first_name",
    "last_name",
    "email",
    "password",
    "id",
    "active",
    "verified",
  ];
  const billingList = Object.keys(billingObject);
  billingList.forEach((item) => {
    if (notAccepted.includes(item)) throw `unsupoorted field ${item}`;
  });
  notAccepted.con;
  await Users.update(billingObject, {
    where: {
      id: {
        [Op.like]: `%${id}%`,
      },
    },
  });
  return await getUser(id);
};

module.exports = {
  addUserBillingInfo,
};
