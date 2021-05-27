import passport from "passport";
import {ExtractJwt, Strategy as JWTstrategy} from "passport-jwt";
import {Strategy as LocalStrategy} from "passport-local";
import {refreshSchema} from "../modules/auth/auth.schemas";
import userModel from "../modules/user/user.model";
import jwt from "jsonwebtoken";

const newAuth = async (user) => {
    let auth = await refreshSchema.findOne({userId: user.id})
    if (!auth) {
        auth = new refreshSchema({
            refresh_token: jwt.sign(
                {user: {id: user.id, email: user.email, name: user.name}},
                'TOP_SECRET'
            ),
            access_token: jwt.sign({id: user.id}, 'TOP_SECRET'),
            expires: Date.now() + 3600000,
            userId: user.id
        })
        await auth.save();
    } else {
        auth.refresh_token = jwt.sign(
            {user: {id: user.id, email: user.email, name: user.name}},
            'TOP_SECRET'
        )
        auth.access_token = jwt.sign({id: user.id}, 'TOP_SECRET')
        auth.expires = Date.now() + 3600000
        await auth.save();
    }
    return {access: auth.access_token, refresh: auth.refresh_token}
}

passport.use(
    'access',
    new JWTstrategy(
        {
            secretOrKey: 'TOP_SECRET',
            jwtFromRequest: ExtractJwt.fromUrlQueryParameter('access_token'),
            passReqToCallback: true
        },
        async (req, token, done) => {
            try {
                const auth = await refreshSchema.findOne({userId: token.id})
                if (req.query.access_token !== auth.access_token || !auth)
                    return done(null, false, {message: 'Invalid access token'})
                if (Date.now() > auth.expires.getTime())
                    return done(null, false, {message: 'Access token has expired'})
                return done(null, token);
            } catch (error) {
                done(error)
            }
        }
    )
);

passport.use(
    'refresh_token',
    new JWTstrategy({
            secretOrKey: 'TOP_SECRET',
            jwtFromRequest: ExtractJwt.fromUrlQueryParameter('refresh_token'),
            passReqToCallback: true
        },
        async (req, token, done) => {
            try {
                const auth = await refreshSchema.findOne({userId: token.user.id})
                const user = await userModel.findOne({id: token.user.id})

                if (!auth) {
                    const userAuth = await newAuth(user);
                    return done(null, userAuth)
                } else if (req.query.refresh_token !== auth.refresh_token)
                    return done(null, false, {message: 'Invalid refresh token'})

                auth.access_token = jwt.sign({id: user.id}, 'TOP_SECRET')
                auth.refresh_token = jwt.sign(
                    {user: {id: user.id, email: user.email, name: user.name}},
                    'TOP_SECRET'
                )
                auth.expires = Date.now() + 3600000;
                await auth.save();
                return done(null, {refresh: auth.refresh_token, access: auth.access_token});
            } catch (error) {
                done(error);
            }
        }
    )
);

passport.use('login',
    new LocalStrategy({
            usernameField: 'email'
        },
        async function (email, password, done) {
            const user = await userModel.findOne({email});
            if (!user) done(null, false, {message: 'Incorrect email'})
            else if (user.password !== password) done(null, false, {message: 'Incorrect password'})
            const userAuth = await newAuth(user);
            done(null, {user: user.dataValues, userAuth})
        }
    )
);
passport.use(
    'signup',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        async (req, email, password, done) => {
            try {
                const user = await userModel.create(req.body.name, email, password);
                return done(null, user);
            } catch (error) {
                done(error);
            }
        }
    )
);
passport.serializeUser(function (user, done) {
    done(null, user.id)
});
// passport.deserializeUser(function (id, done) {
//     userModel.findOne({id}).then((err, user) => {
//         err
//             ? done(err)
//             : done(null, user);
//     })
// }) nuzhen li on ???

export default passport;