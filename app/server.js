import express from 'express';
import bodyParser from 'body-parser';
import userRouter from './modules/user/user.router';
import axios from 'axios';


const app = express();

app.use(bodyParser.json())

app.use('/users', userRouter);

app.use((req, res, next) => {
    console.log(req.body, req.url, req.method);
    next();
})

app.use((err, req, res, next) => {
    console.log(err.stack);
})

app.listen(3000, () => console.log('Server has been started...'))

//axios.get('http://localhost:3000/users/1hr1r16oko5ts5cf').then((res)=>console.log(res.data));
//axios.put('http://localhost:3000/users', {name:'name',email: 'jakepaul@gmail.com'}).catch((e) => {}).then((res)=>{console.log(res.data)})
//axios.patch('http://localhost:3000/users/1hr1r5mgko5u6105', {name: 'John Punk', email: 'johnpunk@gmail.com'});
//axios.delete('http://localhost:3000/users/1hr1r16oko5ts5cf');
