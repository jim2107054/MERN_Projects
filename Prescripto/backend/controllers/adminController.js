import validator from "validator";
import bcrypt from "bcrypt";
import { uploadImageOnCloudinary } from './../config/cloudinary.js';
import doctorModel from './../models/DoctorModel.js';

//API for adding a new doctor
export const addDoctor = async (req, res) => {
  try {
    const {name,email,password,speciality,degree,experience,about,available,fees,address} = req.body;
    let doctorImage = req.file;
    //console log the received data for debugging
    // console.log({name,email,password,speciality,degree,experience,about,available,fees,address},doctorImage);
    // res.status(200).json({message:"ok"});
    //checking for all data to add a doctor
    if (!name ||!email ||!password ||!speciality ||!degree ||!experience ||!about ||!available ||!doctorImage ||!fees ||!address){
      return res.status(400).json({ message: "Please fill all fields" });
    }

    //checking if doctor already exists
    const existingDoctor = await doctorModel.findOne({email});
    if (existingDoctor) {
      return res.status(400).json({ message: "Doctor already exists" });
    }

    //validating email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    //validating strong password
    if(password.length<8){
      return res.status(400).json({ message: "Password must be at least 8 characters long" });
    }

    const salt = await bcrypt.genSalt(10);
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, salt);

    //uploading doctor image to cloudinary
    if(!doctorImage){
        res.status(400).json({ message: "Please upload a doctor image" });
    }

    let image =await uploadImageOnCloudinary(doctorImage.path)

    //creating doctor object
    const doctorData = {
        name,
        email,
        password: hashedPassword,
        image,
        speciality,
        degree,
        experience,
        about,
        available,
        fees: parseFloat(fees), // Convert string to number
        address,
        date: new Date(), // Added date field to fix validation error
    }

    const newDoctor = await doctorModel.create(doctorData);
    if (!newDoctor) {
      return res.status(500).json({ message: "Failed to add doctor" });
    }
    res.json({success:true, message: "Doctor added successfully", doctor: newDoctor });

  } catch (error) {
    console.error("Error adding doctor:", error);
    res.json({success:false, message: "Internal server error" });
  }
};
