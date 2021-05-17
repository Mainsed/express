import controller from './auth.controller'
import Router from 'express'
import passport from 'passport'
// import { createValidator } from "express-joi-validation";
// import { followCreateSchema, followParamsIdSchema, followParamsIdTargetSchema, followSetStatusSchema } from './follow.schemas'

const router = Router();

router.post('/', passport.authenticate('local'), controller.create)
router.get('/:name/:pass', passport.authenticate('local'), /*controller.find*/)
router.delete('/', controller.delete)

export default router;