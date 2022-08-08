'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubTask extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SubTask.init({
    name: DataTypes.STRING,
    desc: DataTypes.TEXT,
    status: DataTypes.BOOLEAN,
    due_date: DataTypes.DATE,
    due_time: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'SubTask',
  });
  return SubTask;
};