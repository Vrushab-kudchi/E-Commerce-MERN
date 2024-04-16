import express from "express";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getAllCategory,
} from "../controller/prodcategoryCtrl.js";

const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCategory);
router.put("/:id", authMiddleware, isAdmin, updateCategory);
router.delete("/:id", authMiddleware, isAdmin, deleteCategory);
router.get("/:id", getCategory);
router.get("/", getAllCategory);

export default router;
