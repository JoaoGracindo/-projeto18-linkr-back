import Joi from "joi";

const signUpSchema = Joi.object({
    username:Joi.string().min(2).required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password:Joi.string().required(),
    pic_url:Joi.string().required()
})

export default signUpSchema