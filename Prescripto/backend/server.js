import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongoDB.js';
import { uploadImageOnCloudinary } from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: [process.env.FRONTEND_URL, process.env.ADMIN_URL, 'http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/admin", adminRouter);
app.use("/api/doctors", doctorRouter);
app.use('/api/user', userRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});

// Make sure DB connection happens before export
await connectDB();
uploadImageOnCloudinary();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
