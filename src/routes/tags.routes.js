import { Router } from "express";
import { getTrending } from "../controllers/tags.controller.js";

const tagsRoutes = Router()

tagsRoutes.get('/hashtags/trending', getTrending)

export default tagsRoutes