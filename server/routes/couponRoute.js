import express from "express";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";
import {
  createCoupon,
  deleteCoupon,
  getACoupon,
  getAllCoupon,
  updateCoupon,
} from "../controller/couponCtrl.js";

const router = express.Router();

router.put("/:id", authMiddleware, isAdmin, updateCoupon);
router.post("/", authMiddleware, isAdmin, createCoupon);
router.get("/", authMiddleware, isAdmin, getAllCoupon);
router.get("/:id", authMiddleware, isAdmin, getACoupon);
router.delete("/:id", authMiddleware, isAdmin, deleteCoupon);

export default router;
