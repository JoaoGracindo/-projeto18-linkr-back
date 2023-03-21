import { getPostOwnerRepository } from "../repositories/postRepository.js";

export async function postOwnerValidation(req, res, next){
    const {id: postId} = req.params;
    const {userId} = res.locals;

    try{
        const {rowCount, rows} = await getPostOwnerRepository(postId);
        if(rowCount === 0) return res.sendStatus(404);
        const {owner} = rows[0];

        if(owner !== userId) return res.sendStatus(401);

    }catch(err){
        return res.status(500).send(err.message);
    }
    next();
}