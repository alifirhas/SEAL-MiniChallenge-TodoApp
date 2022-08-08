const express = require('express');
const userRouter = express.Router();

const userController = require('../controllers/UserController');

userRouter.get("/", userController.get);

module.exports = { userRouter };