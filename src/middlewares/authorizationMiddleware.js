import { getSessionRepository } from "../repositories/userRepository.js";

async function userAuthorization(req, res, next){
    const token = req.headers.authorization?.replace('Bearer ', '');
    if(!token) return res.sendStatus(401);

    try{
        const {rows, rowCount} = await getSessionRepository(token);
        if(rowCount === 0) return res.sendStatus(401);

        res.locals.userId = rows[0];
        req.token = token

    }catch(err){
        return res.status(500).send(err.message);

    }
    next();
}

export default userAuthorization;
