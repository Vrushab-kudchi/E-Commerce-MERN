import Brand from "../models/brandModel.js";
import asyncHandler from "express-async-handler";
import validateMongodbid from "../utils/validateMongodbId.js";

export const createBrand = asyncHandler(async (req, res) => {
  try {
    const brand = await Brand.create(req.body);
    res.status(200).json(brand);
  } catch (error) {
    throw new Error(error);
  }
});

export const updateBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbid(id);
  try {
    const updatedBrand = await Brand.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedBrand);
  } catch (error) {
    throw new Error(error);
  }
});

export const deleteBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbid(id);
  try {
    const deletedBrand = await Brand.findByIdAndDelete(id);
    res.status(200).json(deletedBrand);
  } catch (error) {
    throw new Error(error);
  }
});

export const getBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbid(id);
  try {
    const getBrand = await Brand.findById(id);
    res.status(200).json(getBrand);
  } catch (error) {
    throw new Error(error);
  }
});

export const getAllBrand = asyncHandler(async (req, res) => {
  try {
    const getAllBrands = await Brand.find();
    res.status(200).json(getAllBrands);
  } catch (error) {
    throw new Error(error);
  }
});
