require("dotenv").config();
const express = require("express");
const app = express();
const { sequelize } = require("./models");
const user = require("./route/user");
const port = process.env.port || 4000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/uploads", express.static("./uploads"));
app.use("/register", user);

sequelize.sync().then((e) => {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
});
