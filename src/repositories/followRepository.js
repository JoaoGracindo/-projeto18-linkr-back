import db from '../database/database.js';

export async function checkFollow(id, userId){

    return(
        await db.query(`
            SELECT * FROM follows
            WHERE follower_id = $1
            AND user_id = $2;
        `, [userId, id])
    )
}

export async function follow(id, userId){

    return(
        await db.query(`
            INSERT INTO follows
            (follower_id, user_id)
            VALUES ($1, $2);
        `, [userId, id])
    )
}

export async function unfollow(id, userId){

    return(
        await db.query(`
            DELETE FROM follows
            WHERE follower_id = $1
            AND user_id = $2;
        `, [userId, id])
    )
}