import Joi from "joi";

const repostSchema = Joi.object({
    user_id: Joi.number().integer().required(),
    post_id: Joi.number().integer().required(),
})

export default repostSchema