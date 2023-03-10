import { Router } from "express";
import { postLike, deleteLike, getPostLikes } from "../controllers/likes.controller.js";
import userAuthorization from "../middlewares/authorizationMiddleware.js";

const likesRouter = Router()

likesRouter.post('/likes/:post_id' ,postLike)
likesRouter.delete('/likes/:post_id', deleteLike)
likesRouter.get('/likes/:post_id', getPostLikes)

export default likesRouter