import express from "express";
import {
  createProduct,
  getAProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishList,
  rating,
  uploadImage,
  deleteImage,
} from "../controller/productCtrl.js";
import { isAdmin, authMiddleware } from "../middleware/authMiddleware.js";
import { productImageResize, uploadPhoto } from "../middleware/uploadImage.js";

const router = express.Router();

router.post("/", authMiddleware, isAdmin, createProduct);

router.put(
  "/upload",
  uploadPhoto.array("images"),
  productImageResize,
  uploadImage
);

router.put("/rating", authMiddleware, rating);
router.put("/wishlist", authMiddleware, addToWishList);
router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);

router.delete("/delete-img/:id", authMiddleware, isAdmin, deleteImage);

router.get("/:id", authMiddleware, isAdmin, getAProduct);
router.get("/", getAllProduct);

export default router;
