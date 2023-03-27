import { Router } from "express";

import { getCommentsByIdController, postCommentController } from "../controllers/commentsController.js";
import auth from "../middlewares/authorizationMiddleware.js"

const router = Router();

router.get('/comment/:id', getCommentsByIdController)
router.post('/comment/:id', auth, postCommentController);


export default router;