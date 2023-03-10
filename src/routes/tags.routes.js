import { Router } from "express";
import { getTrending, postTag } from "../controllers/tags.controller.js";
import userAuthorization from "../middlewares/authorizationMiddleware.js";

const tagsRouter = Router()

tagsRouter.get('/hashtags/trending', getTrending)
tagsRouter.post('/hashtags',userAuthorization ,postTag)

export default tagsRouter