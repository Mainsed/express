import Joi from "joi";

export const followCreateSchema = Joi.object({
    id: Joi.string().required(),
    targetId: Joi.string().required()
})
export const followParamsIdSchema = Joi.object({
    id: Joi.string().required(),
})
export const followParamsIdTargetSchema = Joi.object({
    id: Joi.string().required(),
    targetId: Joi.string().required(),
})
export const followSetStatusSchema = Joi.object({
    status: Joi.string().required(),
    id: Joi.string().required(),
    targetId: Joi.string().required(),
})
