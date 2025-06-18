import doctorModel from "./../models/DoctorModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "./../models/appointModel.js";

export const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.json({ success: true, message: "Availability changed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel
      .find({ available: true })
      .select(["-password", "-email"]);
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for doctor login
export const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check if the email and password are provided
    if (!email || !password) {
      return res.json({ success: false, message: "Please provide all fields" });
    }
    //validate the email address
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email format" });
    }
    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res.json({ success: false, message: "Doctor not found" });
    }
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Password" });
    }

    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.json({ success: true, message: "Login successful", token, doctor });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// APi for doctor appointment list
export const appointmentsDoctor = async (req, res) => {
  try {
    const { doctorId } = req.body;
    if (!doctorId) {
      return res.json({ success: false, message: "Doctor ID is required" });
    }
    const appointments = await appointmentModel.find({ doctorId });
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to mark appointments completed  for doctor
export const appointmentComplete = async (req, res) => {
  try {
    const { doctorId, appointmentId } = req.body;
    if (!appointmentId) {
      return res.json({ success: false, message: "No appointment found!" });
    }
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
    }
    if (appointmentData && appointmentData.doctorId !== doctorId) {
      return res.json({
        success: false,
        message: "You are not authorized to complete this appointment",
      });
    }
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      isCompleted: true,
    });
    res.json({
      success: true,
      appointmentData,
      message: "Appointment completed",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to mark appointments calceled  for doctor
export const appointmentCancel = async (req, res) => {
  try {
    const { doctorId, appointmentId } = req.body;
    if (!appointmentId) {
      return res.json({ success: false, message: "No appointment found!" });
    }
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
    }
    if (appointmentData && appointmentData.doctorId !== doctorId) {
      return res.json({
        success: false,
        message: "Unauthorized to cancel this appointment",
      });
    }
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });
    res.json({
      success: true,
      appointmentData,
      message: "Appointment cancelled",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
