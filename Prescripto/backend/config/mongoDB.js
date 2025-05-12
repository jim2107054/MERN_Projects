import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async ()=>{
    try{
        // Connect to MongoDB
        mongoose.connection.on('connected',()=> console.log("MongoDB connected"));
        await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`)
    }
    catch(error){
        console.log("MongoDB connection error: ", error);
    }
}

export default connectDB;