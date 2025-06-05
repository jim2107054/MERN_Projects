import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongoDB.js';
dotenv.config();


//app config 
const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(cors());
app.use(express.json());

//routes
app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});

// Start the server
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});