import { Router } from "express"
import { signUp } from "../controllers/authControllers.js"
import { validateSchema } from "../middlewares/validateSchema.js"
import { validateSignUp } from "../middlewares/validateSignUp.js"
import signUpSchema from "../schemas/signUpSchema.js"

const authRouter = Router()

authRouter.post("/signup",validateSignUp, validateSchema(signUpSchema),signUp)

export default authRouter