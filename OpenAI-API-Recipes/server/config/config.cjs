require("dotenv").config();

module.exports = {
  development: {
	username: "root",
    password: "salah",
    database: "OpenAI-Project-DB",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
  },
};
