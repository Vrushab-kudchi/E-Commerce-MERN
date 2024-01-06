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
} from "../controller/productCtrl.js";
import { isAdmin, authMiddleware } from "../middleware/authMiddleware.js";
import { productImageResize, uploadPhoto } from "../middleware/uploadImage.js";

const router = express.Router();

router.post("/", authMiddleware, isAdmin, createProduct);
router.put(
  "/upload/:id",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  productImageResize,
  uploadImage
);

router.put("/rating", authMiddleware, rating);
router.put("/wishlist", authMiddleware, addToWishList);
router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);
router.get("/:id", authMiddleware, isAdmin, getAProduct);
router.get("/", getAllProduct);

export default router;
