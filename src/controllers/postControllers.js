import {insertPostRepository} from "../repositories/postRepository.js";

export async function getTimelineController(req, res){

    
}

export async function postLinkController(req, res){

    const {userId} = res.locals;
    const {link} = req.body;
    const description = req.body.description ?? null;

    try{
        await insertPostRepository(userId, link, description);
        return res.sendStatus(201);

    }catch(err){
        return res.status(500).send(err.message);
    }
}