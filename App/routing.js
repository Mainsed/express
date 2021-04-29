const router = require('express').Router();
const controller = require('./modules/user/user.controller').UserController;

router.get('/one', controller().findOne)
router.get('/all', controller().findAll)
router.put('/create', controller().create)
router.put('/update', controller().update)
router.delete('/delete', controller().delete)

module.exports = router;