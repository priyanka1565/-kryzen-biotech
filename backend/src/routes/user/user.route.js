const express = require("express");
const route = express.Router();
const userController = require("../../controller/user/user.controller");
const validateRequestBody = require("../../middleware/middleware");

route.post("/signup_user",validateRequestBody,userController.signUpUser);
route.post("/login_user",validateRequestBody,userController.loginUser);

module.exports=route;