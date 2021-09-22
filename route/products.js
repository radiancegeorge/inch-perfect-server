const express = require("express");
const {
  register,
  fetchProducts,
  fetchProductById,
  removeProduct,
  addRatings,
  fetchCategories,
  createCategories,
  deleteCategory,
} = require("../controller/products");
const { protect } = require("../middlewares/protect.middleware");
const uploads = require("../middlewares/uploads.middleware");
const product = express.Router();

product
  .post("/create_product", uploads.array("cover", 4), register)
  .get("/", fetchProducts)
  .get("/single", fetchProductById)
  .post("/delete", removeProduct)
  .post("/rate", protect, addRatings)
  .get("/categories", fetchCategories)
  .post("/category", createCategories)
  .delete("/category", deleteCategory);

module.exports = product;
