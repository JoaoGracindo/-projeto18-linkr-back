import db from "../database/database.js";

export async function insertPostRepository(userId, link, description){

    return await db.query(`
        INSERT INTO posts
        (owner, link, description)
        VALUES ($1, $2, $3);    
    `, [userId, link, description]);
}