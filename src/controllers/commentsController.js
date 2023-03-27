import { getCommentsByIdRepository, postCommentRepository } from "../repositories/commentsRepository.js";

export async function postCommentController(req, res){

    const {userId} = res.locals;
    const {id} = req.params;
    const {comment} = req.body;

    try{
        await postCommentRepository(userId, id, comment);
        const {rows: comments} = await getCommentsByIdRepository(id);
        return res.status(201).send(comments);

    }catch(err){
        return res.status(500).send(err.message);
    }
}

export async function getCommentsByIdController(req, res){

    const {id} = req.params;

    try{
        const {rows: comments} = await getCommentsByIdRepository(id);
        return res.status(200).send(comments);

    }catch(err){
        return res.status(500).send(err.message);
    }
}