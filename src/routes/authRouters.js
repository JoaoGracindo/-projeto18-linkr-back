import { Router } from "express"
import { signUp, signIn } from "../controllers/authControllers.js"
import { validateSchema } from "../middlewares/validateSchema.js"
import { validateSignUp } from "../middlewares/validateSignUp.js"
import { validateSignIn } from "../middlewares/validateSignIn.js"
import signUpSchema from "../schemas/signUpSchema.js"

const authRouter = Router()

authRouter.post("/signup",validateSignUp, validateSchema(signUpSchema),signUp)
authRouter.post("/signIn",validateSignIn,signIn)

export default authRouter