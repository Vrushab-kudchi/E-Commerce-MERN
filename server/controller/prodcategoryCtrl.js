import Category from "../models/prodcategoryModel.js";
import asyncHandler from "express-async-handler";
import validateMongodbid from "../utils/validateMongodbId.js";

export const createCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(200).json(category);
  } catch (error) {
    throw new Error(error);
  }
});

export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbid(id);
  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedCategory);
  } catch (error) {
    throw new Error(error);
  }
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbid(id);
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    res.status(200).json(deletedCategory);
  } catch (error) {
    throw new Error(error);
  }
});

export const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbid(id);
  try {
    const getCategory = await Category.findById(id);
    res.status(200).json(getCategory);
  } catch (error) {
    throw new Error(error);
  }
});

export const getAllCategory = asyncHandler(async (req, res) => {
  try {
    const getAllCategorys = await Category.find();
    res.status(200).json(getAllCategorys);
  } catch (error) {
    throw new Error(error);
  }
});
