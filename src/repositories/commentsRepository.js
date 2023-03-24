import db from "../database/database.js";

export async function postCommentRepository(userId, postId, comment){

    return db.query(`
        INSERT INTO comments
        (comment, user_id, post_id)
        VALUES ($1, $2, $3);
    `, [comment, userId, postId]);
}

export async function getCommentByIdRepository(id){

    return db.query(`
        SELECT *
        FROM comments c
        WHERE c.id=$1;
    `, [id])
}