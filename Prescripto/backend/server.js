import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongoDB.js';
import { uploadImageOnCloudinary } from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
dotenv.config();


//app config 
const app = express();
const PORT = process.env.PORT || 3000;

// Importing the Cloudinary configuration
uploadImageOnCloudinary();

//middleware
app.use(cors());
app.use(express.json());

//api endpoints
app.use("/api/admin",adminRouter)
app.use("/api/doctors",doctorRouter)

//routes
app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});

// Start the server
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});