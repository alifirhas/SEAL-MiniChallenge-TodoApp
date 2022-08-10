const express = require("express");
const subTaskRouter = express.Router();

const subTaskController = require("../controllers/SubTaskController");

subTaskRouter.post("/", subTaskController.addSubTask);

module.exports = { subTaskRouter };
