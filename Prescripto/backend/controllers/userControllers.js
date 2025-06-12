import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import {v2 as cloudinary} from "cloudinary";

// api to register user.
export const registerUser = async (req, res) => {
  // console.log(req.body);
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "Please fill all the details",
      });
    }
    //check the email is valid or not
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    //check the password length
    if (password.length < 8) {
      return res.json({ success: false, message: "Enter a strong password" });
    }

    //check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //create a new user
    // FIX: Removed 'new' keyword and added 'await' to properly create and save the user
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    // console.log(newUser)

    //create a token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.json({
      success: true,
      token,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    res.json({ success: false, message: "Internal Server Error" });
  }
};

// api to login user.
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        success: false,
        message: "Please fill all the details",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    //compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ success: false, message: "Invalid password" });
    }

    //create a token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token, message: "logged in successful" });
  } catch (error) {
    res.json({ success: false, message: "Internal Server Error" });
  }
};

// api to get user profile data.
export const getProfile = async (req, res) => {
  try {
    const { userId } = req.body; // userId should be attached by authUser middleware
    const userData = await userModel.findById(userId).select("-password");
    res.json({ success: true, userData });
  } catch (error) {
    res.json({ success: false, message: "Internal Server Error" });
  }
};

// api to update user profile data.
export const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, age, gender } = req.body;
    const imageFile = req.file; // Assuming we're using multer for file uploads

    if (!name || !phone || !address || !age || !gender) {
      return res.json({
        success: false,
        message: "Please fill all the details",
      });
    }

    const userdata = await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address,
      age,
      gender
    });
    if(imageFile){
      //Upload image to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})

      const imageURL = imageUpload.secure_url;
      await userModel.findByIdAndUpdate(userId, {
        image: imageURL
      });
    }
    // console.log(userdata)
    res.json({
      success: true,
      message: "Profile Updated",
    });
  } catch (error) {
    res.json({ success: false, message: "Internal Server Error" });
  }
};
