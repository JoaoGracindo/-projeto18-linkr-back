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
    SELECT 
    p.*,
    COUNT(l.*) AS num_likes,
    subq.last_likers
  FROM 
    posts p
  LEFT JOIN 
    likes l ON p.id = l.post_id
  LEFT JOIN LATERAL (
    SELECT 
      ARRAY_AGG(u.name) AS last_likers
    FROM 
      likes ll
    JOIN 
      users u ON ll.user_id = u.id
    WHERE 
      ll.post_id = p.id GROUP BY ll.created_at 
    ORDER BY 
      ll.created_at DESC
    LIMIT 2
  ) subq ON true
  WHERE deleted=false
  GROUP BY 
    p.id, subq.last_likers
  ORDER BY 
    p.created_at DESC
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