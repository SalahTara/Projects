
'use strict';

import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import process from "process";
import configFile from "../config/config.cjs"; 
import { fileURLToPath } from "url";
import queriesModel from "./Queries.models.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const env = process.env.NODE_ENV || 'development';
const config = configFile[env];
const basename = path.basename(__filename);
const db = {};


let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const Queries = queriesModel(sequelize, Sequelize.DataTypes);


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach( async file => {
    const modelPath = path.join(__dirname, file);
    const { default: modelDefiner } = await import(`file://${modelPath}`);
    const model = modelDefiner(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Queries = Queries;

// module.exports = db;
export default db;