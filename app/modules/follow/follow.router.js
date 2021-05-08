import controller from './follow.controller'
import Router from 'express'
import {createValidator} from "express-joi-validation";
import {followCreateSchema, followParamsIdSchema, followParamsIdTargetSchema, followSetStatusSchema} from './follow.schemas'

const router = Router();
const validator = createValidator();

router.get('/:id', validator.params(followParamsIdSchema), controller.findById)
router.get('/', controller.findAll)
router.put('/', validator.body(followCreateSchema), controller.create)
router.patch('/', validator.body(followSetStatusSchema),controller.setStatus)
router.delete('/:id/:targetId', validator.params(followParamsIdTargetSchema), controller.delete)

export default router;