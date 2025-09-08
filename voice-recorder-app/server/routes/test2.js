import pool from "../database.js";

async function getNotes() {
  const [result] = await pool.query("SELECT * FROM notes");
  return result;
}

const notes = await getNotes();
console.log(notes);
