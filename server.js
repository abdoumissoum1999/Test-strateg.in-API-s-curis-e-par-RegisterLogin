require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require("cookie-parser");
const routes=require('./routes');
const { errorHandler } = require('./errorMiddleware');
mongoose.connect(process.env.DB)
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.render('home')
});
app.use(routes);
app.use(errorHandler);

app.listen(process.env.PORT,()=>{
    console.log(`listening on port ${process.env.PORT} !!`)
});