require("dotenv").config();
const { maxRating } = process.env;
const { Products, Rating } = require("../../models");
const UUIDV1 = require("uuid").v4;
const { Op, UUID } = require("sequelize");

const getProducts = async (data) => {
  const {
    limit = 10,
    order = [["createdAt", "DESC"]],
    page = 1,
    category,
    sold_out = "1",
    pattern,
    color,
    rating,
    price_ngn,
    price_usd,
  } = data;

  const keys = Object.keys(data);
  const getObjectForCount = () => {
    const nonSuported = ["limit", "page", "order"]
    const newObject = {};
    keys.forEach(item => {
      if(!nonSuported.includes(item)){
        newObject[item] = data[item]
      }
    })
    return newObject;
  }

  const maxColumns = await Products.count({
    where: {
      sold_out: "1",
      ...getObjectForCount()
    },
  });
  const totalPages = Math.ceil(maxColumns / limit);
  if (page > totalPages) return [];
  const maxItem = Number(page) * limit;
  offset = maxItem - limit;
  const products = (
    await Products.findAll({
      where: {
        sold_out,
        ...(price_ngn && { price_ngn }),
        ...(price_usd && { price_usd }),
        ...(category && { category: {
          [Op.like]: `%${category}%`
        } }),
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
const deleteProduct = async (id) => {
  await Products.destroy({
    where: {
      id,
    },
  });
  return true;
};

const addRating = async ({ id, product_id, rate }) => {
  if (!(await getSingleProduct(product_id))) throw "invalid product id!";
  if (await checkIfRated(id, product_id))
    throw "You've already rated this product!";
  await Rating.create({
    id,
    product_id,
    rate: rate.toString(),
  });

  //update product table
  const rating = await (await getRating(product_id)).toString();
  await Products.update(
    {
      rating,
    },
    {
      where: {
        id: product_id,
      },
    }
  );
  return rating;
};
const checkIfRated = async (id, product_id) => {
  return (
    await Rating.findOne({
      where: {
        [Op.and]: [{ product_id }, { id }],
      },
    })
  )?.dataValues;
};
const getRating = async (product_id) => {
  const sum = await getTotalRating(product_id);
  if (!sum) return false;
  const count = await Rating.count({
    where: {
      product_id,
    },
  });
  const rating = Math.floor(sum / count);
  return rating;
};
const getTotalRating = async (product_id) => {
  const sum = await Rating.sum("rate", {
    where: {
      product_id,
    },
  });
  return sum;
};
module.exports = {
  getSingleProduct,
  getProducts,
  registerProducts,
  deleteProduct,
  addRating,
  checkIfRated,
  getRating,
};
