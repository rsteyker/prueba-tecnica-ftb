const { Sequelize } = require("sequelize");

const db = new Sequelize({
  host: "localhost",
  database: "ftb_data",
  pool: 5432,
  username: "postgres",
  password: "root",
  dialect: "postgres",
});

module.exports = db;
