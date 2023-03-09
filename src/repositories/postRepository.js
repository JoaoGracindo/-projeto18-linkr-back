import db from "../database/database.js";

export async function insertPostRepository(userId, link, description){

    return await db.query(`
        INSERT INTO posts
        (owner, link, description)
        VALUES ($1, $2, $3);    
    `, [userId, link, description]);
}

export async function getTimelineRepository(){

    return await db.query(`
        SELECT u.name, u.pic_url, p.link, p.description 
        FROM posts p
        JOIN users u
        ON p.owner=u.id
        ORDER BY p.created_at DESC
        LIMIT 20;
    `)
}