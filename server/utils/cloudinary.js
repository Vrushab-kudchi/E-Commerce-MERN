import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET_KEY,
});

export const cloudinaryUploadImage = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath);
    return {
      public_id: result.public_id,
      url: result.secure_url,
      asset_id: result.asset_id,
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};

export const cloudinaryDeleteImage = async (filePath) => {
  try {
    const result = await cloudinary.uploader.destroy(filePath);
    return {
      public_id: result.public_id,
      url: result.secure_url,
      asset_id: result.asset_id,
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};
