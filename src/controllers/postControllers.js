import {insertPostRepository, getTimelineRepository, putLinkRepository, deleteLinkRepository} from "../repositories/postRepository.js";
import { repoGetPostLikes } from "../repositories/likesRepository.js";
import urlMetadata from 'url-metadata';

export async function getTimelineController(req, res){
    try{

        const teste = await repoGetPostLikes();

        console.log(teste)
        const {rows: timeline} = await getTimelineRepository();
        for(let i = 0; i < timeline.length; i++){
            const { count: {rows: [count]}, users: {rows: users} } = await repoGetPostLikes(timeline[i].id);
            const names = users.map(user => user.users);

            timeline[i] = {
                ...timeline[i],
                likesCount: count.count,
                users: names
            };
        }

        return res.status(200).send(timeline);
    }catch(err){
        return res.status(500).send(err.message);
    }
    
}

export async function postLinkController(req, res){

    const {userId} = res.locals;
    const {link} = req.body;
    const description = req.body.description ?? null;
    const meta = await urlMetadata(link)
    console.log(meta)

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