import { Router } from "express";

import { getCommentByIdController, postCommentController } from "../controllers/commentsController.js";
import auth from "../middlewares/authorizationMiddleware.js"

const router = Router();

router.get('/comment/:id', getCommentByIdController)
router.post('/comment/:id', auth, postCommentController);


export default router;