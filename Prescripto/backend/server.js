import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

// app config
const app = express();
const post = process.env.PORT || 4000;

// middleware
app.use(cors());
app.use(express.json());

//api endpoints
app.get('/',(req,res)=>{
    res.send("Hello World");
})

app.listen(post,()=>{
    console.log(`Server is running on port ${post}`);
})