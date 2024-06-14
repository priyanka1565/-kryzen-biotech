const express = require("express");
const route = express.Router();
const productController = require("../../controller/product/product.controller");
const validateRequestBody = require("../../middleware/middleware");
const verifyToken = require("../../middleware/verify.token");

route.post("/add_product",verifyToken,validateRequestBody,productController.addProduct);
route.post("/get_product", verifyToken, productController.getProductList);
route.put("/edit/:id", verifyToken, productController.editProduct);
route.delete("/delete/:id",verifyToken,productController.deleteProduct)



module.exports=route;