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
        SELECT u.name, u.pic_url, p.link, p.description, COUNT(l.user_id) AS "likes", 
        FROM posts p
        JOIN users u
        ON p.owner=u.id
        JOIN likes l
        ON p.id=l.post_id
        GROUP BY p.id
        ORDER BY p.create_at DESC
        LIMIT 20;
    `)
}