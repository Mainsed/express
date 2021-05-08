import Joi from "joi";

export const postCreateSchema = Joi.object({
    text: Joi.string().required(),
    creator: Joi.string().required()
})
export const postParamsIdSchema = Joi.object({
    id: Joi.string().required(),
})
