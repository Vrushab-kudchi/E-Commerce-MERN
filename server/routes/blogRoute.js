import express from "express";
import { createBlog } from "../controller/blogCtrl.js";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, isAdmin, createBlog);

export default router;
