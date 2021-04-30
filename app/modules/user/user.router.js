import controller from './user.controller'
import Router from 'express'
const router = Router();
router.get('/:id', controller.findOne)
router.get('/', controller.findAll)
router.put('/', controller.create)
router.patch('/:id', controller.update)
router.delete('/:id', controller.delete)

export default router;