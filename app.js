require("dotenv").config();
const express = require("express");
const error = require("./middlewares/error.middleware");
const app = express();
const { sequelize } = require("./models");
const coupons = require("./route/coupons");
const orders = require("./route/orders");
const product = require("./route/products");
const user = require("./route/user");
// require("./utils/paystack");
const cors = require("cors");
const sendMail = require("./utils/mailer");
const port = process.env.port || 4000;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/uploads", express.static("./uploads"));
app.use("/user", user);
app.use("/products", product);
app.use("/coupon", coupons);
app.use("/orders", orders);

app.get("/test-mail", (req, res) => {
  sendMail({
    html: "<p>Hello</p>",
    to: ["radiancegeorge@gmail.com"],
  }).then((data) => {
    console.log(data);
    res.send("sent hello!");
  });
});
//handle error
app.use(error);
sequelize.sync().then((e) => {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
});
