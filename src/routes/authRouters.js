import { Router } from "express"
import { signUp, signIn, logout } from "../controllers/authControllers.js"
import { validateSchema } from "../middlewares/validateSchema.js"
import { validateSignUp } from "../middlewares/validateSignUp.js"
import { validateSignIn } from "../middlewares/validateSignIn.js"
import userAuthorization from "../middlewares/authorizationMiddleware.js"
import signUpSchema from "../schemas/signUpSchema.js"

const authRouter = Router()

authRouter.post("/sign-up",validateSignUp, validateSchema(signUpSchema),signUp)
authRouter.post("/sign-in",validateSignIn,signIn)
authRouter.delete("/logout",userAuthorization,logout)

export default authRouter