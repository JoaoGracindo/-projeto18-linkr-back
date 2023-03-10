import tagsRoutes from "./tags.routes.js";
import authRouter from "./authRouters.js";
import postRouter from "./postRoutes.js";
import likesRoutes from "./likes.routes.js";
import userRouter from "./userRoute.js";

export const routes = [likesRoutes, tagsRoutes, authRouter, postRouter, userRouter]