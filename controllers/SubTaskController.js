const jsonwebtoken = require("jsonwebtoken");
const db = require("../models/index");
const subTask = db.subtask;

exports.addSubTask = async (req, res, next) => {
    try {
        const { name, desc, due_date, due_time, taskId } = req.body;

        if (!name || !desc || !taskId) {
            return res.sendStatus(400);
        }

        action = await subTask.create({
            name: name,
            desc: desc,
            due_date: due_date,
            due_time: due_time,
            taskId: taskId,
        });

        return res.status(201).json({
            status: 201,
            message: "SubTask Created",
            subTask: action,
        });

    } catch (e) {
        console.log(e);
        return res.status(400).json({
            status: 400,
            message: "Terjadi masalah dalam pembuatan subtask",
            error: e,
        });
    }

};

exports.editSubTask = async (req, res, next) => {
    try {
        const { name, desc, status, due_date, due_time } = req.body;

        const action = await subTask.update(
            {
                name: name,
                desc: desc,
                status: status,
                due_date: due_date,
                due_time: due_time
            },
            {
                where: {
                    id: req.params.id
                },
            }
        );

        if (action[0] === 0) {
            return res.status(400).json({
                status: 400,
                message: "SubTask tidak ditemukan",
            });
        } else {
            return res.status(200).json({
                status: 200,
                message: "SubTask berhasil diperbarui"
            });
        }

    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: "Terjadi masalah dalam pembaruan subtask",
            error: error,
        });
    }
};

exports.deleteSubTask = async (req, res, next) => {
    try {
        const action = await subTask.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (action[0] === 0) {
            return res.status(400).json({
                status: 400,
                message: "SubTask tidak ditemukan",
            });
        } else {
            return res.status(200).json({
                status: 200,
                message: "SubTask berhasil dihapus",
            });
        }

    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: "Terjadi masalah dalam penghapusan task",
            error: error,
        });
    }
}