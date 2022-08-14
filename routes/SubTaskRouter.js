const express = require("express");
const subTaskRouter = express.Router();

const subTaskController = require("../controllers/SubTaskController");

subTaskRouter.post("/", subTaskController.addSubTask);
subTaskRouter.put("/:id", subTaskController.editSubTask);
subTaskRouter.delete("/:id", subTaskController.deleteSubTask);

module.exports = { subTaskRouter };
