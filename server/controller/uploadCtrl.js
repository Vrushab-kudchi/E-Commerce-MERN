import {
  cloudinaryUploadImage,
  cloudinaryDeleteImage,
} from "../utils/cloudinary.js";
import fs from "fs";
import asyncHandler from "express-async-handler";

export const uploadImage = asyncHandler(async (req, res) => {
  const filePath = req.url;
  try {
    const url = await Promise.all(
      filePath.map(async (path) => {
        const cloudinaryResult = await cloudinaryUploadImage(path);
        fs.unlinkSync(path);
        return cloudinaryResult;
      })
    );

    res.status(200).send(url);
  } catch (error) {
    throw new Error(error);
  }
});

export const deleteImage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await cloudinaryDeleteImage(id);
    res.json({ message: "deleted" });
  } catch (error) {
    throw new Error(error);
  }
});
