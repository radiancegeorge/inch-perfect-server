const asyncHandler = require("express-async-handler");
const {
  getCategories,
  addCategory,
  removeCategory,
  checkCategory,
} = require("../../utils/category");
const {
  registerProducts,
  getProducts,
  getSingleProduct,
  deleteProduct,
  addRating,
} = require("../../utils/products");

const register = asyncHandler(async (req, res, next) => {
  const { files } = req;
  console.log(files);
  const data = req.body;
  if (!files?.length) throw "file empty";
  data.product_image = JSON.stringify(
    files.map((file) => `${process.env.server_url}uploads/${file.filename}`)
  );
  try {
    const product = await registerProducts(data);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    throw "form validation failed";
  }
});

const fetchProducts = asyncHandler(async (req, res, next) => {
  const { query: body } = req;
  console.log(body);
  res.status(200).json(await getProducts(body));
});

const fetchProductById = asyncHandler(async (req, res, next) => {
  const { id } = req.query;
  const product = await getSingleProduct(id);
  if (!product) throw "no product with such id found";
  res.status(200).json(product);
});

const removeProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.query;
  const isDeleted = await deleteProduct(id);
  if (!isDeleted) throw "there was an error deleting this product!";
  res.status(200).json("deleted");
});

const addRatings = asyncHandler(async (req, res, next) => {
  const { product_id, rate } = req.body;
  const { id } = req.user;
  console.log(req.body);
  const rating = await addRating({
    id,
    product_id,
    rate,
  });
  if (!rating) throw "error with rating";
  res.status(200).json({ newRating: rating });
});
const fetchCategories = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    categories: await getCategories(),
  });
});
const createCategories = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const newCategory = await addCategory(name);
  res.status(200).json(newCategory);
});
const deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.query;
  const isDeleted = await removeCategory(id);
  res.status(200).json(isDeleted);
});
const ifExist = asyncHandler(async (req, res, next) => {
  const { category } = req.body;
  const exist = await checkCategory(category);
  res.status(200).json(exist);
});
module.exports = {
  register,
  fetchProducts,
  fetchProductById,
  removeProduct,
  addRatings,
  fetchCategories,
  createCategories,
  deleteCategory,
  ifExist,
};
