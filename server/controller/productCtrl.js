import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import slugify from "slugify";
import {
  cloudinaryUploadImage,
  cloudinaryDeleteImage,
} from "../utils/cloudinary.js";
import fs from "fs";
import validateMongodbid from "../utils/validateMongodbId.js";

export const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newProduct = await Product.create(req.body);
    res.send({ newProduct });
  } catch (error) {
    throw new Error(error);
  }
});

export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updateProduct = await Product.findByIdAndUpdate(id, req.
      body, {
      new: true,
    });
    res.status(200).send(updateProduct);
  } catch (error) {
    throw new Error(error);
  }
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleteProduct = await Product.findByIdAndDelete(id);
    res.status(200).send(deleteProduct);
  } catch (error) {
    throw new Error(error);
  }
});

export const getAProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const findProduct = await Product.findById(id)
      .populate("color")
      .populate({
        path: "ratings.postedby",
        select: ["firstname", "lastname"],
      });
    res.send(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});

//Performs Query *
export const getAllProduct = asyncHandler(async (req, res) => {
  try {
    //Filtering
    let queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`);
    let query = Product.find(JSON.parse(queryStr)).populate("color");

    //sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // limiting the field
    if (req.query.fields) {
      const selected = req.query.fields.split(",").join(" ");
      query = query.select(selected);
    } else {
      query = query.select("-__v");
    }

    //pagination
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const productCount = await Product.countDocuments();
      if (skip >= productCount) throw new Error("this Page doesnt exist");
    }

    const product = await query;
    res.status(200).send(product);
  } catch (error) {
    throw new Error(error);
  }
});

export const addToWishList = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { productId } = req.body;
  try {
    const user = await User.findById(_id);
    const alreadyadded = user.wishlist.find(
      (id) => id.toString() === productId
    );
    if (alreadyadded) {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $pull: { wishlist: productId },
        },
        {
          new: true,
        }
      );
      res.status(200).send(user);
    } else {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $push: { wishlist: productId },
        },
        {
          new: true,
        }
      );
      res.status(200).send(user);
    }
  } catch (error) {
    throw new Error(error);
  }
});

export const rating = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, productId, comment } = req.body;
  try {
    const product = await Product.findById(productId);
    let alreadyRated = product.ratings.find(
      (userId) => userId.postedby.toString() === _id.toString()
    );
    if (alreadyRated) {
      const updateRating = await Product.updateOne(
        {
          ratings: { $elemMatch: alreadyRated },
        },
        {
          $set: { "ratings.$.star": star, "ratings.$.comment": comment },
        },
        {
          new: true,
        }
      );
    } else {
      const rateProduct = await Product.findByIdAndUpdate(
        productId,
        {
          $push: {
            ratings: {
              star: star,
              comment: comment,
              postedby: _id,
            },
          },
        },
        {
          new: true,
        }
      );
    }
    const getallratings = await Product.findById(productId);
    let totalRating = getallratings.ratings.length;
    let ratingsum = getallratings.ratings
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);
    let actualRating = Math.round(ratingsum / totalRating);
    let finalproduct = await Product.findByIdAndUpdate(
      productId,
      {
        totalRating: actualRating,
      },
      { new: true }
    );
    res.json(finalproduct);
  } catch (error) {
    throw new Error(error);
  }
});

export const uploadImage = asyncHandler(async (req, res) => {
  const filePath = req.url;
  try {
    const url = await Promise.all(
      filePath.map(async (path) => {
        const cloudinaryResult = await cloudinaryUploadImage(path);
        fs.unlinkSync(path);
        return cloudinaryResult;
      })
    );

    res.status(200).send(url);
  } catch (error) {
    throw new Error(error);
  }
});

export const deleteImage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await cloudinaryDeleteImage(id);
    res.json({ message: "deleted" });
  } catch (error) {
    throw new Error(error);
  }
});
