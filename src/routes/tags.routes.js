import { Router } from "express";
import { getTrending, postTag, deletePostTags } from "../controllers/tags.controller.js";
import userAuthorization from "../middlewares/authorizationMiddleware.js";

const tagsRouter = Router()

tagsRouter.get('/hashtags/trending', getTrending)
tagsRouter.post('/hashtags',userAuthorization ,postTag)
tagsRouter.delete('/hashtags/:post_id',userAuthorization ,deletePostTags)

export default tagsRouter