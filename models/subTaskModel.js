module.exports = (sequelize, DataTypes) => {
	const subtasks = sequelize.define("subtasks", {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		name: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		desc: {
			allowNull: true,
			type: DataTypes.TEXT,
		},
		status: {
			allowNull: false,
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		due_date: {
			type: DataTypes.DATE,
		},
		due_time: {
			type: DataTypes.TIME,
		},
		createdAt: {
			allowNull: false,
			type: DataTypes.DATE,
		},
		updatedAt: {
			allowNull: false,
			type: DataTypes.DATE,
		}
	});
	return subtasks;
};
