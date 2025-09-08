import sequelize from "../database.js";

async function getNotes() {
  const [result] = await sequelize.query("SELECT * FROM table_name");
  return result;
}

const notes = await getNotes();
console.log(notes);
