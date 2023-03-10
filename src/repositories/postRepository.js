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
        SELECT u.name, u.pic_url, p.link, p.description, p.id AS id
        FROM posts p
        JOIN users u
        ON p.owner=u.id
        WHERE p.deleted=false
        ORDER BY p.created_at DESC
        LIMIT 20;
    `)
}

export async function getPostOwnerRepository(postId){

    return await db.query(`
        SELECT owner
        FROM posts
        WHERE id=$1;
    `, [postId]);
}

export async function putLinkRepository(newDescription, postId){

    return await db.query(`
        UPDATE posts
        SET description=$1
        WHERE id=$2;
    `, [newDescription, postId]);
}

export async function deleteLinkRepository(postId){

    return await db.query(`
        UPDATE posts
        SET deleted=TRUE
        WHERE id=$1;
    `, [postId]);
}