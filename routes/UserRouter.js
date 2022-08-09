const express = require("express");
const userRouter = express.Router();

const userController = require("../controllers/UserController");

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);

module.exports = { userRouter };
