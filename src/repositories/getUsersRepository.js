import db from "../database/database.js";

export async function getUsersRepository(name) {
  return db.query("SELECT * FROM users WHERE name LIKE $1;", [`%${name}%`]);
}
