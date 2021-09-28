require("dotenv").config();
const {
  db_user: username,
  db_password: password,
  db: database,
  db_host: host,
} = process.env;

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect: "mysql",
  },
  test: {
    storage: "./db.sqlite",
    dialect: "sqlite",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
