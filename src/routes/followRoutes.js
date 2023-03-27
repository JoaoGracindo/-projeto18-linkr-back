import { Router } from "express";

import auth from '../middlewares/authorizationMiddleware.js'
import { followController } from "../controllers/followController.js";

const router = Router();

router.post('/follow/:id', auth, followController);

export default router;