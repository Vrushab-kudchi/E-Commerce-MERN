import cloudinary from "cloudinary";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_ID,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryUploadImage = async (filepath) => {
  try {
    const result = await cloudinary.v2.uploader.upload(filepath);
    return result.secure_url;
  } catch (error) {
    console.error("Error Occurred While Uploading Image", error);
    throw new Error(error);
  }
};
