import { Sequelize } from "@sequelize/core";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  dialect: process.env.MYSQL_DIALECT,
  port: 3306,
});

export default sequelize;
