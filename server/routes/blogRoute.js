import express from "express";
import {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlog,
  deleteBlog,
  likeBlog,
  dislikeBlog,
  uploadImage,
} from "../controller/blogCtrl.js";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";
import { blogImageResize, uploadPhoto } from "../middleware/uploadImage.js";

const router = express.Router();

router.put(
  "/upload/:id",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  blogImageResize,
  uploadImage
);
router.post("/", authMiddleware, isAdmin, createBlog);
router.put("/likes", authMiddleware, likeBlog);
router.put("/dislikes", authMiddleware, dislikeBlog);
router.put("/:id", authMiddleware, isAdmin, updateBlog);
router.get("/:id", getBlog);
router.get("/", getAllBlog);
router.delete("/:id", authMiddleware, isAdmin, deleteBlog);

export default router;
