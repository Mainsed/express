const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json())

app.use((req, res, next) => {
    console.log(req.body, req.method, req.url);
    next();
})

app.use('/users', require('./routing'))

app.listen(3000, () => console.log('Server has been started...'))

http.get(`http:/localhost:3000/users/one?id=1hr1r2p8knvm8r6a`);
http.get(`http:/localhost:3000/users/all`)