import Blog from "../models/blogModel.js";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import validateMongodbid from "../utils/validateMongodbId.js";

export const createBlog = asyncHandler(async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.status(200).send({ newBlog });
  } catch (error) {
    throw new Error(error);
  }
});
