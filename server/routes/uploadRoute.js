import express from "express";

import { isAdmin, authMiddleware } from "../middleware/authMiddleware.js";
import { productImageResize, uploadPhoto } from "../middleware/uploadImage.js";
import { deleteImage, uploadImage } from "../controller/uploadCtrl.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  productImageResize,
  uploadImage
);

router.delete("/delete-img/:id", authMiddleware, isAdmin, deleteImage);

export default router;
