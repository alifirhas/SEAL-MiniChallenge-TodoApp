const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");

const task = db.define("Tasks", {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: Sequelize.INTEGER,
	},
	name: {
		allowNull: false,
		type: Sequelize.STRING,
	},
	desc: {
		allowNull: true,
		type: Sequelize.TEXT,
	},
	status: {
		allowNull: false,
		type: Sequelize.BOOLEAN,
		defaultValue: false,
	},
	due_date: {
		type: Sequelize.DATE,
	},
	due_time: {
		type: Sequelize.TIME,
	},
	createdAt: {
		allowNull: false,
		type: Sequelize.DATE,
	},
	updatedAt: {
		allowNull: false,
		type: Sequelize.DATE,
	},
});

db.sync()
	.then(() => {
		console.log("Task table created successfully!");
	})
	.catch((error) => {
		console.error("Unable to create table : ", error);
	});

module.exports = task;
