import Router from 'express'
import passport from 'passport'

const router = Router();
router.post('/', async (req, res, next) => {
    passport.authenticate('refresh_token', {session: false}, (err, data, info) => {
        if (data)
            return res.json(data);
        else if (info.message) return res.json(info.message)
        else return res.json(info.toString())
    })(req, res, next)
})
router.get('/', async (req, res, next) => {
    passport.authenticate('access', {session: false}, (err, data, info) => {
        if (data)
            return res.json(data);
        else if (info.message) return res.json(info.message)
        else return res.json(info.toString())
    })(req, res, next)
})
router.post('/login', async (req, res, next) => {
        passport.authenticate(
            'login', {session: false}, (err, data, info) => {
                if (data)
                    return res.json(data);
                else if (info.message) return res.json(info.message)
                else return res.json(info.toString())
            })(req, res, next)
    }
);
router.post(
    '/signup',
    passport.authenticate('signup', {session: false}),
    async (req, res, next) => {
        res.json({
            message: 'Signup successful',
            user: req.user
        });
    }
);

export default router;