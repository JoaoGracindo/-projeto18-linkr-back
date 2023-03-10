import { Router } from "express";

import auth from "../middlewares/authorizationMiddleware.js";
import linkSchema from "../schemas/linkSchema.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import {deleteLinkController, getPostsByHashtag, getTimelineController, postLinkController, putLinkController} from "../controllers/postControllers.js";
import { postOwnerValidation } from "../middlewares/postMatchMiddleware.js";

const router = Router();


router.get('/timeline', auth, getTimelineController);
router.get('/hashtags/:hashtag', auth, getPostsByHashtag);
router.post('/post-link', auth, validateSchema(linkSchema), postLinkController);
router.put('/link/:id', auth, postOwnerValidation, putLinkController);
router.delete('/link/:id', auth, postOwnerValidation, deleteLinkController);

export default router;