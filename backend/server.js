const express = require('express');
const dotenv = require('dotenv');

const authUserRouter = require('./router/auth.user.js');
const messageRouter = require('./router/messageRoutes.js');
const userRouter = require('./router/user-sidebarRoutes.js');
const createMongoConn = require('./db/dbConfig.js');
const cookieParser = require('cookie-parser');

const app =express();
dotenv.config();
const port = process.env.PORT || 5000;

app.use(express.json()); // Parse JSON in the request body
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());


app.use('/api/auth', authUserRouter);
app.use('/api', messageRouter);
app.use('/api', userRouter);

app.listen(port, ()=>
 {
    createMongoConn();
    console.log(`server is ruuning on ${port}`)
})