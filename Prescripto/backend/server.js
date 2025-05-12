import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongoDB.js';
import connectCloudinary from './config/cloudinary.js';
dotenv.config();

// app config
const app = express();
const post = process.env.PORT || 4000;

connectCloudinary();

// middleware
app.use(cors());
app.use(express.json());

//api endpoints
app.get('/',(req,res)=>{
    res.send("Hello World");
})

app.listen(post,()=>{
    connectDB();
    console.log(`Server is running on port ${post}`);
})