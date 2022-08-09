require("dotenv").config();
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
  }
);

sequelize.sync()
  .then(() => {
    console.log("Table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.tasks = require("./taskModel")(sequelize, Sequelize);
db.users = require("./userModel")(sequelize, Sequelize);
db.subtask = require("./subTaskModel")(sequelize, Sequelize);

db.users.hasMany(db.tasks, { onDelete: "cascade" });
db.tasks.belongsTo(db.users, { onDelete: "cascade" });

db.tasks.hasMany(db.subtask, { onDelete: "cascade" });
db.subtask.belongsTo(db.tasks, { onDelete: "cascade" });

module.exports = db;