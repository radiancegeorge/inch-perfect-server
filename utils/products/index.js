const { Products } = require("../models");
const getProducts = async ({
  limit = 10,
  order = [["DESC", "createdAt"]],
  page = 1,
  category,
  sold_out = "1",
  pattern,
  color,
  rating,
}) => {
  const maxColumns = await products.count({
    where: {
      sold_out: "1",
    },
  });
  const totalPages = Math.ceil(maxColumns / limit);
  if (page > totalPages) throw "maximum page reached!";
  const offset = page * limit;
  const products = await Products.findAll({
    where: {
      sold_out,
      ...(category && { category }),
      ...(pattern && { pattern }),
      ...(color && { color }),
      ...(rating && { rating }),
    },
    limit,
    order,
    offset,
  });
  return products;
};

const getSingleProduct = async (id) => {
  return await Products.findOne({
    where: {
      id,
    },
  });
};

module.exports = { getSingleProduct, getProducts };
