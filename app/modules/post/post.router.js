import controller from './post.controller'
import Router from 'express'
import {createValidator} from "express-joi-validation";
import {postCreateSchema, postParamsIdSchema} from './post.schemas'

const router = Router();
const validator = createValidator();

router.get('/:id', validator.params(postParamsIdSchema), controller.findOne)
router.get('/', controller.findAll)
router.put('/', validator.body(postCreateSchema), controller.create)
router.patch('/:id', validator.params(postParamsIdSchema), controller.update)
router.delete('/:id', validator.params(postParamsIdSchema), controller.delete)

export default router;