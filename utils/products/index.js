const { Products } = require("../../models");
const UUIDV1 = require("uuid").v1;

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
        ...(color && { color }),
        ...(rating && { rating }),
      },
      limit,
      order,
      offset,
    })
  )?.map((item) => item.dataValues);

  console.log(products);
  return products;
};

const getSingleProduct = async (id) => {
  return await Products.findOne({
    where: {
      id,
    },
  });
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
