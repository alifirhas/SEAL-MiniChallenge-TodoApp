const jsonwebtoken = require("jsonwebtoken");
const db = require("../models/index");
const subTask = db.subtask;

exports.addSubTask = async (req, res, next) => {
    try {
        const { name, desc, taskId } = req.body;

        if (!name || !desc || !taskId) {
            return res.sendStatus(400);
        }

        await subTask.create({
            name: name,
            desc: desc,
            taskId: taskId,
        });

        res.status(201).json({
            status: 201,
            message: "SubTask Created"
        });

    } catch (e) {
        console.log(e);
        res.status(400).send({
            status: 400,
            message: "Terjadi masalah dalam pengambilan data task",
            error: e,
        });
    }

};