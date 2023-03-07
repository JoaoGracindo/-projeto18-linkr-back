import db from '../database/database.js';

export async function getSessionRepository(token){

    return db.query('SELECT user_id FROM sessions WHERE token=$1;', [token]);
}