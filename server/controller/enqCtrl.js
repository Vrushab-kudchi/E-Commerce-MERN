import Enquiry from "../models/enqModel.js";
import asyncHandler from "express-async-handler";
import validateMongodbid from "../utils/validateMongodbId.js";

export const createEnquiry = asyncHandler(async (req, res) => {
  try {
    const brand = await Enquiry.create(req.body);
    res.status(200).json(brand);
  } catch (error) {
    throw new Error(error);
  }
});

export const updateEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbid(id);
  try {
    const updatedEnquiry = await Enquiry.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});

export const deleteEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbid(id);
  try {
    const deletedEnquiry = await Enquiry.findByIdAndDelete(id);
    res.status(200).json(deletedEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});

export const getEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbid(id);
  try {
    const getEnquiry = await Enquiry.findById(id);
    res.status(200).json(getEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});

export const getAllEnquiry = asyncHandler(async (req, res) => {
  try {
    const getAllEnquirys = await Enquiry.find();
    res.status(200).json(getAllEnquirys);
  } catch (error) {
    throw new Error(error);
  }
});
