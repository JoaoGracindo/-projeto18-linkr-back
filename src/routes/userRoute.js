import { Router } from "express";
import { getUserByIdController } from "../controllers/getUserByIdControler.js";
import userAuthorization from "../middlewares/authorizationMiddleware.js";

const userRouter = Router();

userRouter.get("/user/:id", userAuthorization, getUserByIdController);

export default userRouter;
