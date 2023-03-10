import db from "../database/database.js";

export async function getUserByIdRepository(id) {
  return await db.query(
    `
  SELECT p.owner, p.link, p.description, p.id, users.pic_url, users.name
  FROM posts p
  JOIN users
  ON users.id = p.owner
  WHERE p.deleted = false AND users.id = $1
  GROUP BY p.id, users.pic_url, users.name
  ORDER BY p.created_at DESC
  LIMIT 20;
    `,
    [id]
  );
}

export async function getLikesRepository(postId) {
  const users = await db.query(
    `
  SELECT u.name
  FROM likes l
  JOIN users u
  ON u.id = l.user_id
  WHERE l.post_id = $1
  LIMIT 2;
    `,
    [postId]
  );

  const count = await db.query(`
  SELECT count(likes.post_id)
  FROM likes
  WHERE likes.post_id = $1`, [postId]);

  return {users, count}
}
