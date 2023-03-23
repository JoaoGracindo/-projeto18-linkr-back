import db from "../database/database.js";

export async function getUsersRepository(name) {
  return db.query("SELECT * FROM users WHERE name LIKE $1;", [`%${name}%`]);
}

export async function getUserByIdRepository(id){
  return db.query(`
      SELECT * 
      FROM users
      WHERE name = $1;
    `, [id])
}