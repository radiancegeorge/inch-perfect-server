const { Products } = require("../../models");
const UUIDV1 = require("uuid").v1;
const { Op } = require("sequelize");
const getProducts = async ({
  limit = 10,
  order = [["createdAt", "DESC"]],
  page = 1,
  category,
  sold_out = "1",
  pattern,
  color,
  rating,
}) => {
  const maxColumns = await Products.count({
    where: {
      sold_out: "1",
    },
  });
  const totalPages = Math.ceil(maxColumns / limit);
  if (page > totalPages) throw "maximum page reached!";
  const maxItem = Number(page) * limit;
  offset = maxItem - limit;
  const products = (
    await Products.findAll({
      where: {
        sold_out,
        ...(category && { category }),
        ...(pattern && { pattern }),
        ...(color && {
          color: {
            [Op.like]: `%${color}%`,
          },
        }),
        ...(rating && { rating }),
      },
      limit: Number(limit),
      order,
      ...(offset && { offset: Number(offset) }),
    })
  )?.map((item) => item.dataValues);
  return {
    data: products,
    page,
    totalPages,
    totalProducts: maxColumns,
  };
};

const getSingleProduct = async (id) => {
  return (
    await Products.findOne({
      where: {
        id,
      },
    })
  )?.dataValues;
};

const registerProducts = async ({ id = UUIDV1(), ...rest }) => {
  await Products.create({
    id,
    ...rest,
  });
  return {
    id,
    ...rest,
  };
};
module.exports = { getSingleProduct, getProducts, registerProducts };
