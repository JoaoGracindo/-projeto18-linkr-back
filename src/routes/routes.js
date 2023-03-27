import tagsRouter from "./tags.routes.js";
import authRouter from "./authRouters.js";
import postRouter from "./postRoutes.js";
import userRouter from "./userRoute.js";
import likesRouter from "./likes.routes.js";
import commentsRouter from "./commentsRoutes.js";
import followersRouter from "./followRoutes.js"

export const routes = [tagsRouter, likesRouter, authRouter, postRouter, userRouter, commentsRouter, followersRouter]

