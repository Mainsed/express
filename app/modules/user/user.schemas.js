import Joi from "joi";

export const userCreateSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email()
})
export const userParamsIdSchema = Joi.object({
    id: Joi.string().required(),
})
