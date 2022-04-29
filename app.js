const express = require('express');
const mongoose = require('mongoose');
const app = express();
const urlRoutes = require('./routes/urls');
const bodyParser = require('body-parser');

//Middle ware
app.use(bodyParser.json());
app.use('/urls', urlRoutes);

// Connection to Database
mongoose.connect('mongodb://localhost/urldb');

mongoose.connection
    .once('open',()=>{
        console.log('Connected');
    })
    .on('error',(error)=>{
        console.log(error);
    })

//lets listen
app.listen(3000,()=>{
    console.log("server is live");
})