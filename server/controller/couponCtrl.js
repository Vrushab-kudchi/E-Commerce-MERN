import Coupon from "../models/couponModel.js";
import validateMongodbid from "../utils/validateMongodbId.js";
import asyncHandler from "express-async-handler";

export const createCoupon = asyncHandler(async (req, res) => {
  try {
    const newCoupon = await Coupon.create(req.body);
    res.status(200).send(newCoupon);
  } catch (error) {
    throw new Error(error);
  }
});

export const getACoupon = asyncHandler(async (req, res) => {
  try {
    const getACoupons = await Coupon.findById(req.params.id);
    res.status(200).send(getACoupons);
  } catch (error) {
    throw new Error(error);
  }
});

export const getAllCoupon = asyncHandler(async (req, res) => {
  try {
    const getAllCoupons = await Coupon.find();
    res.status(200).send(getAllCoupons);
  } catch (error) {
    throw new Error(error);
  }
});

export const updateCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbid(id);
  try {
    const updatedCoupon = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).send(updatedCoupon);
  } catch (error) {
    throw new Error(error);
  }
});

export const deleteCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbid(id);
  try {
    const deletedCoupon = await Coupon.findByIdAndDelete(id);
    res.status(200).send(deletedCoupon);
  } catch (error) {
    throw new Error(error);
  }
});
