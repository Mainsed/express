import Joi from "joi";

export const userCreateSchema = Joi.object({
    name: Joi.string().required()
        .messages({
            'string.base':'Field should be type text',
            'any.required':'Field is required'
        }),
    email: Joi.string().email()
        .messages({
            'string.base':'Field should be type text',
            'string.email':'Incorrect email'
        }),
    password: Joi.string().required()
}).options({abortEarly : false})
export const userParamsIdSchema = Joi.object({
    id: Joi.string().required(),
})
