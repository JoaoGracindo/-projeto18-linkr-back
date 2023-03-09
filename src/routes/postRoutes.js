import { Router } from "express";

import auth from "../middlewares/authorizationMiddleware.js";
import linkSchema from "../schemas/linkSchema.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import {deleteLinkController, getTimelineController, postLinkController, putLinkController} from "../controllers/postControllers.js";
import { postOwnerValidation } from "../middlewares/postMatchMiddleware.js";

const router = Router();

router.use(auth);
router.get('/timeline', getTimelineController);
router.post('/post-link', validateSchema(linkSchema), postLinkController);
router.put('/link/:id', postOwnerValidation, putLinkController);
router.delete('/link/:id', postOwnerValidation, deleteLinkController);

export default router;