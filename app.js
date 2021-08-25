require("dotenv").config();
const express = require("express");
const error = require("./middlewares/error.middleware");
const app = express();
const { sequelize } = require("./models");
const product = require("./route/products");
const user = require("./route/user");
const port = process.env.port || 4000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/uploads", express.static("./uploads"));
app.use("/user", user);
app.use("/products", product);
//handle error
app.use(error);
sequelize.sync().then((e) => {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
});
