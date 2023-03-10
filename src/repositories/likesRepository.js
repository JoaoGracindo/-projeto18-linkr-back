import connection from "../database/database.js";

export function repoPostLike(user_id, post_id) {

    return connection.query(`
            INSERT INTO likes (user_id, post_id)
            VALUES ($1, $2)
        `, [user_id, post_id])


}

export function repoDeleteLike(user_id, post_id) {

    return connection.query(`
            DELETE FROM likes
            WHERE user_id = $1 AND post_id = $2
        `, [user_id, post_id])

}

export async function repoGetPostLikes(post_id) {
    const count = await connection.query(`
            SELECT count(likes.post_id)
            FROM likes
            WHERE likes.post_id = $1
        `, [post_id])

    const users = await connection.query(`
            SELECT users.name AS users
            FROM likes
            JOIN users
            ON likes.user_id = users.id
            WHERE likes.post_id = $1
            ORDER BY users.name asc
            LIMIT 2
        `, [post_id])
    return { count, users }
}