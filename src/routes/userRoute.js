import { Router } from "express";
import { getUserByIdController } from "../controllers/getUserByIdControler.js";
import { getUsersController } from "../controllers/getUsersController.js";
import userAuthorization from "../middlewares/authorizationMiddleware.js";

const userRouter = Router();

userRouter.get("/user/:id", userAuthorization, getUserByIdController);
userRouter.get("/users/:nameSearched", getUsersController);

export default userRouter;
