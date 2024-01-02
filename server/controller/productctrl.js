import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";
import slugify from "slugify";

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
    const updateProduct = await Product.findByIdAndUpdate(id, req.body, {
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
    const findProduct = await Product.findById(id);
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
    let query = Product.find(JSON.parse(queryStr));

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
    res.status(200).send({ product });
  } catch (error) {
    throw new Error(error);
  }
});
