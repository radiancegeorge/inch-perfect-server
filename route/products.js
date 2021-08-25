const express = require("express");
const {
  register,
  fetchProducts,
  fetchProductById,
  removeProduct,
} = require("../controller/products");
const uploads = require("../middlewares/uploads.middleware");
const product = express.Router();

product
  .post("/create_product", uploads.array("cover", 4), register)
  .get("/", fetchProducts)
  .get("/single", fetchProductById)
  .post("/delete", removeProduct);

module.exports = product;
