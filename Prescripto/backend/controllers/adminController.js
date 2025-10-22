import validator from "validator";
import bcrypt from "bcrypt";
import { uploadImageOnCloudinary } from "./../config/cloudinary.js";
import doctorModel from "./../models/DoctorModel.js";
import jwt from "jsonwebtoken";
import appointmentModel from "./../models/appointModel.js";
import userModel from "./../models/userModel.js";

//API for adding a new doctor
export const addDoctor = async (req, res) => {
  console.log("backend a data ase");
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
    let doctorImage = req.file;

    console.log("Request body:", req.body);
    console.log("Uploaded file:", doctorImage);

    //checking for all data to add a doctor
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !doctorImage ||
      !fees ||
      !address
    ) {
      return res.status(400).json({ success: false, message: "Please fill all fields" });
    }

    //checking if doctor already exists
    const existingDoctor = await doctorModel.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ success: false, message: "Doctor already exists" });
    }

    //validating email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    //validating strong password
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    const salt = await bcrypt.genSalt(10);
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, salt);

    //uploading doctor image to cloudinary
    let image;
    try {
      image = await uploadImageOnCloudinary(doctorImage.path);
      if (!image) {
        return res.status(400).json({ success: false, message: "Failed to upload image" });
      }
    } catch (uploadError) {
      console.error("Image upload error:", uploadError);
      return res.status(400).json({ success: false, message: "Failed to upload image to cloudinary" });
    }

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
      fees: parseFloat(fees), // Convert string to number
      address,
      date: Date.now(), // Use Date.now() to get timestamp as number
    };

    console.log("Doctor data to save:", doctorData);

    const newDoctor = await doctorModel.create(doctorData);
    if (!newDoctor) {
      return res.status(500).json({ success: false, message: "Failed to add doctor" });
    }
    
    res.status(201).json({
      success: true,
      message: "Doctor added successfully",
      doctor: newDoctor,
    });
  } catch (error) {
    console.error("Error adding doctor:", error);
    res.status(500).json({ success: false, janina:"problem jani na", message: "Internal server error: " + error.message });
  }
};

//API for the admin login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.json({ success: false, message: "Invalid email or password" });
    }
    let token = jwt.sign(email + password, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for getting all doctors list for admin panel
export const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password"); // we don't want to show password in the response
    if (!doctors || doctors.length === 0) {
      return res.json({ success: false, message: "No doctors found" });
    }
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get all appointments list for admin panel
export const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to cancel an appointment by admin
export const cancelAppointmentAdmin = async (req, res) => {
  try {
    const { adminId, appointmentId } = req.body; //we get adminId from authAdmin middleware and appointmentId from request body
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!adminId) {
      return res.json({
        success: false,
        message: "Please login as admin to cancel appointment",
      });
    }
    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
    }
    await appointmentModel.findByIdAndDelete(appointmentId, {
      cancelled: true,
    });

    //remove the appointment from the doctor's appointments array
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
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get dashboard data for admin panel
export const adminDashboard = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    const users = await userModel.find({});
    const appointments = await appointmentModel.find({});
    const dashData = {
      doctors: doctors.length,
      users: users.length,
      appointments: appointments.length,
      latestAppointments: appointments.reverse().slice(0, 5), // Get the last 5 appointments
    };
    res.json({ success: true, dashData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
