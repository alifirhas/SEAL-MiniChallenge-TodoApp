const express = require("express");
const taskRouter = express.Router();

const taskController = require("../controllers/TaskController");

taskRouter.get("/", taskController.get);
taskRouter.post("/", taskController.post);
taskRouter.put("/:id", taskController.put);
taskRouter.delete("/:id", taskController.delete);

module.exports = { taskRouter };
