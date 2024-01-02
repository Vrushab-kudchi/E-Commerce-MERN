import express from "express";
import {
  createProduct,
  getAProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
} from "../controller/productCtrl.js";
import { isAdmin, authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, isAdmin, createProduct);
router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);
router.get("/:id", authMiddleware, isAdmin, getAProduct);
router.get("/", getAllProduct);

export default router;
