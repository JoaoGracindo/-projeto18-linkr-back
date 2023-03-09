import { Router } from "express";

import auth from "../middlewares/authorizationMiddleware.js";
import linkSchema from "../schemas/linkSchema.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import {getTimelineController, postLinkController} from "../controllers/postControllers.js";

const router = Router();

router.use(auth);
router.get('/timeline', getTimelineController);
router.post('/post-link', validateSchema(linkSchema), postLinkController);

export default router;