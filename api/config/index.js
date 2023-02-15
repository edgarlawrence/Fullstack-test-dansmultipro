const sequelize = require("sequelize");

const db = new sequelize("job_app", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = db;
