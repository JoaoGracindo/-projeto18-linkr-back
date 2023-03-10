import { Router } from "express";
import { getTrending, postTag } from "../controllers/tags.controller.js";

const tagsRouter = Router()

tagsRouter.get('/hashtags/trending', getTrending)
tagsRouter.post('/hashtags', postTag)

export default tagsRouter