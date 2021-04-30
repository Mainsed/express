import express from 'express'
import bodyParser from 'body-parser'
import userRouter from './modules/user/user.router';

const app = express();

app.use(bodyParser.json())

app.use((req, res, next) => {
    console.log(req.body,req.url,res.method);
    next();
})

app.use('/users', userRouter)

app.listen(3000, () => console.log('Server has been started...'))
