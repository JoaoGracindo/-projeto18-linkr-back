import { Router } from "express";
import { postLike, deleteLike, getPostLikes } from "../controllers/likes.controller.js";
import userAuthorization from "../middlewares/authorizationMiddleware.js";

const likesRouter = Router()

likesRouter.post('/likes/:post_id', (req,res,next)=>{console.log(req.headers); next();},userAuthorization, postLike)
likesRouter.delete('/likes/:post_id', userAuthorization, deleteLike)
likesRouter.get('/likes/:post_id', getPostLikes)

export default likesRouter