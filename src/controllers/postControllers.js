import {insertPostRepository, getTimelineRepository, putLinkRepository, deleteLinkRepository} from "../repositories/postRepository.js";

export async function getTimelineController(req, res){
    try{
        const {rows: timeline} = await getTimelineRepository();

        return res.status(200).send(timeline);
    }catch(err){
        return res.status(500).send(err.message);
    }
    
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

export async function putLinkController(req, res){

    const {id: postId} = req.params;
    const {description} = req.body;

    try{   
        await putLinkRepository(description, postId);
        return res.sendStatus(200)

    }catch(err){
        return res.status(500).send(err.message);
    }
}

export async function deleteLinkController(req, res){

    const {id: postId} = req.params;

    try{
        await deleteLinkRepository(postId);
        return res.sendStatus(200);
        
    }catch(err){
        return res.status(500).send(err.message);
    }
}