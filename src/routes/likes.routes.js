import { Router } from "express";
import { postLike, deleteLike, getPostLikes } from "../controllers/likes.controller.js";
import userAuthorization from "../middlewares/authorizationMiddleware.js";

const likesRoutes = Router()

likesRoutes.post('/likes/:post_id' ,userAuthorization, postLike)
likesRoutes.delete('/likes/:post_id', userAuthorization, deleteLike)
likesRoutes.get('/likes/:post_id', getPostLikes)

export default likesRoutes