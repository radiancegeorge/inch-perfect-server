const asyncHandler = require("express-async-handler");
const { registerProducts, getProducts } = require("../../utils/products");

const register = asyncHandler(async (req, res, next) => {
  const { files } = req;
  console.log(files);
  const data = req.body;
  if (!files?.length) throw "file empty";
  data.product_image = JSON.stringify(
    files.map(
      (file) => `${process.env.server_url}product_image/${file.originalname}`
    )
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
  const { body } = req;
  res.status(200).json(await getProducts(body));
});
module.exports = {
  register,
  fetchProducts,
};
