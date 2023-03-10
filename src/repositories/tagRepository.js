import connection from "../database/database.js";

export function repoTrending(){
    return connection.query(`
        SELECT tags.name AS name, count("tagsPivot".tag_id)
        FROM "tagsPivot"
        JOIN tags
        ON "tagsPivot".tag_id = tags.id
        GROUP BY tags.name
        ORDER BY count("tagsPivot".tag_id) desc
    `)
} 