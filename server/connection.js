const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.blgkr.mongodb.net/chatAppMern?retryWrites=true&w=majority`, ()=>{
    console.log("connect mongo db");
})

mongoose.connection.on('error',(err)=>{
    console.log("error connecting",err)
})
