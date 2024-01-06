import Blog from "../models/blogModel.js";
import asyncHandler from "express-async-handler";
import { cloudinaryUploadImage } from "../utils/cloudinary.js";
import fs from "fs";
import validateMongodbid from "../utils/validateMongodbId.js";

export const createBlog = asyncHandler(async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.status(200).send({ newBlog });
  } catch (error) {
    throw new Error(error);
  }
});

export const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbid(id);
  try {
    const updateBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).send({ updateBlog });
  } catch (error) {
    throw new Error(error);
  }
});

export const getBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbid(id);
  try {
    const blog = await Blog.findById(id).populate("likes");
    const getandupdatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        $inc: { numViews: 1 },
      },
      { new: true }
    );
    res.status(200).send({ blog });
  } catch (error) {
    throw new Error(error);
  }
});

export const getAllBlog = asyncHandler(async (req, res) => {
  try {
    const getAllBlogs = await Blog.find();
    res.status(200).send(getAllBlogs);
  } catch (error) {
    throw new Error(error);
  }
});

export const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbid(id);
  try {
    const deleteBlog = await Blog.findByIdAndDelete(id);
    res.status(200).send({ deleteBlog });
  } catch (error) {
    throw new Error(error);
  }
});

export const likeBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  validateMongodbid(blogId);
  try {
    // Find the blog which you want to be liked
    const blog = await Blog.findById(blogId);
    // find the login user
    const loginUserId = req?.user?._id;
    // find if the user has liked the blog
    const isLiked = blog?.isLiked;
    // find if the user has disliked the blog
    console.log(blog?.dislikes?.toString());

    const alreadyDisliked =
      Array.isArray(blog?.dislikes) &&
      blog?.dislikes.find(
        (userId) => userId?.toString() === loginUserId?.toString()
      );

    if (alreadyDisliked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { dislikes: loginUserId },
          isDisliked: false,
        },
        { new: true }
      );
      res.json(blog);
    }
    if (isLiked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { likes: loginUserId },
          isLiked: false,
        },
        { new: true }
      );
      res.json(blog);
    } else {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $push: { likes: loginUserId },
          isLiked: true,
        },
        { new: true }
      );
      res.json(blog);
    }
  } catch (error) {
    throw new Error(error);
  }
});

export const dislikeBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  validateMongodbid(blogId);
  try {
    // Find the blog which you want to be liked
    const blog = await Blog.findById(blogId);
    // find the login user
    const loginUserId = req?.user?._id;
    // find if the user has liked the blog
    const isDisLiked = blog?.isDisliked;
    // find if the user has disliked the blog
    const alreadyLiked =
      Array.isArray(blog.likes) &&
      blog?.likes?.find(
        (userId) => userId?.toString() === loginUserId?.toString()
      );
    if (alreadyLiked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { likes: loginUserId },
          isLiked: false,
        },
        { new: true }
      );
      res.json(blog);
    }
    if (isDisLiked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { dislikes: loginUserId },
          isDisliked: false,
        },
        { new: true }
      );
      res.json(blog);
    } else {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $push: { dislikes: loginUserId },
          isDisliked: true,
        },
        { new: true }
      );
      res.json(blog);
    }
  } catch (error) {
    throw new Error(error);
  }
});

export const uploadImage = asyncHandler(async (req, res) => {
  const filePath = req.url;
  const { id } = req.params;
  validateMongodbid(id);
  try {
    const url = await Promise.all(
      filePath.map(async (path) => {
        const cloudinaryResult = await cloudinaryUploadImage(path);
        fs.unlinkSync(path);
        return cloudinaryResult;
      })
    );
    const uploadedImages = await Blog.findByIdAndUpdate(
      id,
      {
        images: url.map((file) => ({
          public_id: file.public_id,
          url: file.url,
        })),
      },
      { new: true }
    );
    res.status(200).send(uploadedImages);
  } catch (error) {
    throw new Error(error);
  }
});
