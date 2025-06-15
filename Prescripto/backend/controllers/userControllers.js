import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "./../models/DoctorModel.js";
import appointmentModel from "../models/appointModel.js";

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
    res.json({ success: true, message: "Fetched User", userData });
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

    const userData = await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address,
      age,
      gender,
    });
    if (imageFile) {
      //Upload image to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });

      const imageURL = imageUpload.secure_url;
      await userModel.findByIdAndUpdate(userId, {
        image: imageURL,
      });
    }
    // console.log(userData)
    res.json({
      success: true,
      message: "Profile Updated",
      userData,
    });
  } catch (error) {
    res.json({ success: false, message: "Internal Server Error" });
  }
};

// api to book an appointment.
export const bookAppointment = async (req, res) => {
  try {
    const { userId, doctorId, slotDate, slotTime } = req.body;
    const docData = await doctorModel.findById(doctorId).select("-password");
    if (!docData.available) {
      return res.json({ success: false, message: "Doctor is not available" });
    }
    let slots_booked = docData.slots_booked || [];

    // Check if the slot availability
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot not available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    //get the user data
    const userData = await userModel.findById(userId).select("-password");
    delete docData.slots_booked; // Remove slots_booked from doctor data to avoid sending it to the client

    //create a new appointment
    const appointmentData = {
      userId,
      doctorId,
      userData,
      doctorData: docData,
      slotDate,
      slotTime,
      amount: Number(docData.fees), // Convert fee to a number
      date: Date.now(),
    };

    const newAppointment = await appointmentModel.create(appointmentData);

    //save new slots data in
    await doctorModel.findByIdAndUpdate(doctorId, {
      slots_booked: slots_booked,
    });
    res.json({
      success: true,
      message: "Appointment Booked",
      appointment: newAppointment,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// api to get all appointments of a user to show in MyAppointments page.
export const listAppointments = async (req, res) => {
  try {
    const { userId } = req.body; // userId should be attached by authUser middleware
    const appointments = await appointmentModel.find({ userId });
    res.json({ success: true, appointments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// api to cancel an appointment.
export const cancleAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body; // userId should be attached by authUser middleware
    const appointmentData = await appointmentModel.findById(appointmentId);

    //verify if the appointment belongs to the user
    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: "Unauthorized action" });
    }

    await appointmentModel.findByIdAndDelete(appointmentId, {
      cancelled: true,
    });
    // Remove the slot from doctor's booked slots
    const { doctorId, slotTime, slotDate } = appointmentData;

    const doctorData = await doctorModel.findById(doctorId);

    let slots_booked = doctorData.slots_booked;

    if (slots_booked[slotDate]) {
      slots_booked[slotDate] = slots_booked[slotDate].filter(
        (time) => time !== slotTime
      );
    }
    // Update the doctor's slots_booked
    await doctorModel.findByIdAndUpdate(doctorId, {
      slots_booked: slots_booked,
    });
    res.json({ success: true, message: "Cancelled Appointment" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
