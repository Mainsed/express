import controller from './user.controller'
import Router from 'express'
import {createValidator} from "express-joi-validation";
import {userCreateSchema, userParamsIdSchema} from './user.schemas'

const router = Router();
const validator = createValidator();

router.get('/:id', validator.params(userParamsIdSchema), controller.findOne)
router.get('/', controller.findAll)
router.put('/', validator.body(userCreateSchema), controller.create)
router.patch('/:id', validator.params(userParamsIdSchema), controller.update)
router.delete('/:id', validator.params(userParamsIdSchema), controller.delete)

export default router;