import express from 'express';
import bodyParser from 'body-parser';
import userRouter from './modules/user/user.router';
import postRouter from './modules/post/post.router'
import followRouter from './modules/follow/follow.router'
import axios from 'axios';

const app = express();

app.use(bodyParser.json())

app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/follow', followRouter);

app.use((req, res, next) => {
    console.log(req.body, req.url, req.method);
    next();
})

app.use((err, req, res, next) => {
    console.log(err.stack);
})

app.listen(3000, () => console.log('Server has been started...'))

//axios.get('http://localhost:3000/users/ewf9vi8koct3zw9').then((res)=>console.log(res.data));
//axios.get('http://localhost:3000/users').then((res)=>console.log(res.data));
//axios.put('http://localhost:3000/users', {name:'name',email: 'jakepaul@gmail.com'}).catch((e) => {}).then((res)=>{console.log(res.data)})
// axios.patch('http://localhost:3000/users/1hr1r5mgko5u6105', {name: 'John Punk', email: 'johnpunk@gmail.com'});
// axios.delete('http://localhost:3000/users/1hr1r16oko5ts5cf');

//axios.get('http://localhost:3000/posts').then((res)=>console.log(res.data));
//axios.put('http://localhost:3000/posts', {text:'name',creator: '2fdb935b-2aae-4dbe-b23f-783509f62384'}).catch((e) => {}).then((res)=>{console.log(res.data)})
//axios.patch('http://localhost:3000/posts/1hr1r5mgko5u6105', {text: 'John Punk', creator: 'johnpunk@gmail.com'});
//axios.delete('http://localhost:3000/posts/1hr1r16oko5ts5cf');

//axios.get('http://localhost:3000/follow').then((res)=>console.log(res.data));
//axios.get('http://localhost:3000/follow/1hr1r16oko5ts5cf').then((res)=>console.log(res.data));
//axios.put('http://localhost:3000/follow', {id:'2fdb935b-4dbe-b23f-783509f62384',targetId: '7a226945-421a-4392-b70f-ebe9166c0311'}).catch((e) => {}).then((res)=>{console.log(res.data)})
//axios.delete('http://localhost:3000/follow/1hr1r16oko5ts5cf/1hr1r16oko2ts5cf');
//axios.patch('http://localhost:3000/follow', {status:'accepted', id:'1hr1r16oko5ts5cf', targetId:'1hr1r16oko2ts5cf'})//.then((res)=>console.log(res.data))
