import dotenv from 'dotenv'
dotenv.config();

// require('dotenv').config({path:'../.env'});
import app from "./app";
import connectDB from "./db/db";


connectDB().then((res)=>{
    app.listen(process.env.PORT,()=>{
        console.log("server started at port ",process.env.PORT)
    });    
}).catch((err)=>{
    console.log("failed to connect");
})