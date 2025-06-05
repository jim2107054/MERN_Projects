import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload an image to Cloudinary
export const uploadImageOnCloudinary = async (filePath) => {
  try {
    if (!filePath) {
      return null;
    }
    const result = await cloudinary.uploader.upload(filePath);
    console.log(result);
    //Remove the file from local file system after uploading on cloudinary
    fs.unlinkSync(filePath);
    return result.secure_url; // Return the secure URL of the uploaded image
  } catch (error) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // Ensure the file is removed even if upload fails
    }
    console.error("Error uploading image to Cloudinary:", error);
    throw error;
  }
};
