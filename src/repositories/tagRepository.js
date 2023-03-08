import connection from "../database/database.js";

export function repoTrending(){
    return connection.query(`
        SELECT tags.name
        FROM tags
        ORDER BY tags.mentions desc;
    `)
} 