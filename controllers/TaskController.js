const db = require("../models/index");
const Task = db.tasks;
const subTask = db.subtask;
const { Op } = require("sequelize");
const jsonwebtoken = require("jsonwebtoken");

class TaskController {
	async get(req, res) {
		try {
			const authToken = req.headers.authorization;
			const decoded = jsonwebtoken.verify(
				authToken.split(" ")[1],
				process.env.SECRET_KEY
			);

			let filter = {
				userId: decoded.user.id,
			};

			if (req.query.id) {
				filter.id = req.query.id;
			}
			if (req.query.status) {
				filter.status = req.query.status;
			}
			if (req.query.due_date) {
				filter.due_date = { [Op.gte]: req.query.due_date };
			}
			if (req.query.start_date && req.query.end_date) {
				filter.due_date = {
					[Op.between]: [req.query.start_date, req.query.end_date],
				};
			}

			const data = await Task.findAll({
				where: filter,
				include: subTask
			});

			return res.status(200).json({
				status: 200,
				message: "Task berhasil diambil",
				task: data,
			});
		} catch (error) {
			console.log(error);
			return res.status(400).json({
				status: 400,
				message: "Terjadi masalah dalam pengambilan data task",
				error: error,
			});
		}
	}

	async post(req, res) {
		try {
			const authToken = req.headers.authorization;
			const decoded = jsonwebtoken.verify(
				authToken.split(" ")[1],
				process.env.SECRET_KEY
			);

			const action = await Task.create({
				name: req.body.name,
				desc: req.body.desc,
				status: 0,
				due_date: req.body.due_date,
				due_time: req.body.due_time,
				userId: decoded.user.id,
			});

			return res.status(200).json({
				status: 200,
				message: "Task berhasil dibuat",
				task: action,
			});
		} catch (error) {
			return res.status(400).json({
				status: 400,
				message: "Terjadi masalah dalam pembuatan task",
				error: error,
			});
		}
	}

	async put(req, res) {
		try {
			const authToken = req.headers.authorization;
			const decoded = jsonwebtoken.verify(
				authToken.split(" ")[1],
				process.env.SECRET_KEY
			);

			const action = await Task.update(
				{
					name: req.body.name,
					desc: req.body.desc,
					status: req.body.status,
					due_date: req.body.due_date,
					due_time: req.body.due_time,
				},
				{
					where: {
						id: req.params.id,
						userId: decoded.user.id,
					},
				}
			);

			if (action[0] === 0) {
				return res.status(400).json({
					status: 400,
					message: "Task tidak ditemukan",
				});
			} else {
				return res.status(200).json({
					status: 200,
					message: "Task berhasil diperbarui"
				});
			}

		} catch (error) {
			return res.status(400).json({
				status: 400,
				message: "Terjadi masalah dalam pembuatan task",
				error: error,
			});
		}
	}

	async delete(req, res) {
		try {
			const action = await Task.destroy({
				where: {
					id: req.params.id,
				},
			});

			if (action[0] === 0) {
				return res.status(400).json({
					status: 400,
					message: "Task tidak ditemukan",
				});
			} else {
				return res.status(200).json({
					status: 200,
					message: "Task berhasil dihapus",
				});
			}

		} catch (error) {
			console.log(error);
			return res.status(400).json({
				status: 400,
				message: "Terjadi masalah dalam penghapusan task",
				error: error,
			});
		}
	}
}

module.exports = new TaskController();
