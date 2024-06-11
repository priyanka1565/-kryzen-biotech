const express = require("express");
const app = express();
const userRoute = require("./user/user.route");
const productRoute = require("./product/product.route");
app.use("/user",userRoute);
app.use("/product",productRoute);

module.exports = app;
