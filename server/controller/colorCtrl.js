import Color from "../models/colorModel.js";
import asyncHandler from "express-async-handler";
import validateMongodbid from "../utils/validateMongodbId.js";

export const createColor = asyncHandler(async (req, res) => {
  try {
    const brand = await Color.create(req.body);
    res.status(200).json(brand);
  } catch (error) {
    throw new Error(error);
  }
});

export const updateColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbid(id);
  try {
    const updatedColor = await Color.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedColor);
  } catch (error) {
    throw new Error(error);
  }
});

export const deleteColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbid(id);
  try {
    const deletedColor = await Color.findByIdAndDelete(id);
    res.status(200).json(deletedColor);
  } catch (error) {
    throw new Error(error);
  }
});

export const getColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbid(id);
  try {
    const getColor = await Color.findById(id);
    res.status(200).json(getColor);
  } catch (error) {
    throw new Error(error);
  }
});

export const getAllColor = asyncHandler(async (req, res) => {
  try {
    const getAllColors = await Color.find();
    res.status(200).json(getAllColors);
  } catch (error) {
    throw new Error(error);
  }
});
