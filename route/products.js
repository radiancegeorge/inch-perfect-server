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
const { protect, adminProtect } = require("../middlewares/protect.middleware");
const uploads = require("../middlewares/uploads.middleware");
const product = express.Router();

product
  .post(
    "/create_product",
    protect,
    adminProtect,
    uploads.array("cover", 4),
    register
  )
  .get("/", fetchProducts)
  .get("/single", fetchProductById)
  .delete("/", protect, adminProtect, removeProduct)
  .post("/rate", protect, addRatings)
  .get("/categories", fetchCategories)
  .post("/category", protect, adminProtect, createCategories)
  .delete("/category", protect, adminProtect, deleteCategory);

module.exports = product;
