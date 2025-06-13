import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    doctorId: { type: String, required: true },
    slotDate: { type: String, required: true },
    slotTime: { type: String, required: true },
    userData: { type: Object, required: true },
    doctorData: { type: Object, required: true },
    amount: { type: Number, required: true }, // Toal number appointment
    date: { type: Number, required: true }, // Date of appointment creation
    cancelled: { type: Boolean, default: false }, // If appointment is cancelled
    payment: { type: Boolean, default: false }, // If appointment is paid online.
    isCompleted: { type: Boolean, default: false }, // If appointment is completed
  },
  { timestamps: true }
);

const appointmentModel =
  mongoose.models.appointment ||
  mongoose.model("appointment", appointmentSchema);
export default appointmentModel;
