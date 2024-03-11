import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import Cart from "../models/cartModel.js";
import Coupon from "../models/couponModel.js";
import Order from "../models/orderModel.js";

import asyncHandler from "express-async-handler";
import { generateToken } from "../config/jwtToken.js";
import validateMongodbid from "../utils/validateMongodbId.js";
import { generateRefreshToken } from "../config/refreshToken.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "./emailCtrl.js";
import crypto from "crypto";
import uniqid from "uniqid";

// @desc Create a new User
export const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    const newUser = await User.create(req.body);
    res.status(201).send(newUser);
  } else {
    throw new Error("User Already Exist");
  }
});

// @desc Login user and return jsonwebtoken
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });
  // Checking user exists or not
  if (findUser && (await findUser.ispasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findUser?._id);
    await User.findByIdAndUpdate(findUser._id, { refreshToken }, { new: true });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.status(200).send({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid Credentails");
  }
});

// @desc Login Admin and return jsonwebtoken
export const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findAdmin = await User.findOne({ email });
  // Checking user exists or not
  if (findAdmin.role !== "admin") throw new Error("Not Authorized User");
  if (findAdmin && (await findAdmin.ispasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findAdmin?._id);
    await User.findByIdAndUpdate(
      findAdmin._id,
      { refreshToken },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.status(200).send({
      _id: findAdmin?._id,
      firstname: findAdmin?.firstname,
      lastname: findAdmin?.lastname,
      email: findAdmin?.email,
      mobile: findAdmin?.mobile,
      token: generateToken(findAdmin?._id),
    });
  } else {
    throw new Error("Invalid Credentails");
  }
});

//@desc Handle referesh Token
export const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token Available");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user)
    throw new Error("No Refresh Token present in database to match with");
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("There is Something wrong with refresh Token");
    }
    const accessToken = generateToken(user?._id);
    res.json(accessToken);
  });
});

//@desc Handle logout
export const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token Available");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return response.sendStatus(204);
  }
  await User.findOneAndUpdate(
    { refreshToken },
    {
      refreshToken: "",
    }
  );
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  response.sendStatus(204);
});

//@desc Update a User by Id params
export const updateAUser = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    validateMongodbid(_id);
    let updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      { new: true }
    );
    res.status(200).send(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

//@desc save User Address
export const saveAddress = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbid(_id);
  try {
    const updateUser = await User.findByIdAndUpdate(
      _id,
      {
        address: req.body?.address,
      },
      { new: true }
    );
    res.status(200).send(updateUser);
  } catch (error) {
    throw new Error(error);
  }
});

//@desc Get All Users
export const getAllUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.status(200).send(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

//@desc Get Single Users by Id params
export const getAUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongodbid(id);
    const getUser = await User.findById(id).select("-password");
    res.status(200).send(getUser);
  } catch (error) {
    throw new Error(error);
  }
});

//@desc Delete a user by Id params
export const deleteAUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongodbid(id);
    const deleteUser = await User.findByIdAndDelete(id);
    res.status(200).send(deleteUser);
  } catch (error) {
    throw new Error(error);
  }
});

//@desc Block user
export const blockUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongodbid(id);
    const block = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      { new: true }
    );
    res.json({ message: "user Blocked" });
  } catch (error) {
    throw new Error(error);
  }
});

//@desc unBlock user
export const unblockUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongodbid(id);
    const unblock = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      { new: true }
    );
    res.json({ message: "user unblocked" });
  } catch (error) {
    throw new Error(error);
  }
});

export const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongodbid(_id);
  const user = await User.findById(_id);
  if (password) {
    user.password = password;
    const updatedPassword = await user.save();
    res.json(updatedPassword);
  } else {
    res.json(user);
  }
});

export const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found with this email");
  try {
    const token = await user.createPasswordResetToken();
    user.save();
    const resetUrl = `Hi, Please Follow this link to reset the password. this link is valid till 10 mins from now  <a href='${process.env.CLIENT_DOMAIN}/reset-password/${token}'>Click Here</a>`;
    const data = {
      to: email,
      text: "hey User,",
      subject: "Forget Password Link",
      html: resetUrl,
    };
    await sendEmail(data);
    res.json(token);
  } catch (error) {
    throw new Error(error);
  }
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error("Token Expired, Please try again later");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.json(user);
});

export const getWishList = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const findUser = await User.findById(_id).populate("wishlist");
    res.status(200).send(findUser);
  } catch (error) {
    throw new Error(error);
  }
});

export const userCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { productId, color, quantity, price } = req.body;
  validateMongodbid(_id);
  try {
    let newCart = await Cart.create({
      userId: _id,
      productId,
      color,
      quantity,
      price,
    });
    res.status(200).send(newCart);
  } catch (error) {
    throw new Error(error);
  }
});

export const getUserCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbid(_id);
  try {
    const cart = await Cart.find({ userId: _id })
      .populate("productId")
      .populate("color");
    res.status(200).send(cart);
  } catch (error) {
    throw new Error(error);
  }
});

export const deleteSingleCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { cartItemId } = req.params;
  validateMongodbid(_id);
  try {
    const deletecart = await Cart.findOneAndDelete({
      userId: _id,
      _id: cartItemId,
    });
    res.status(200).send(deletecart);
  } catch (error) {
    throw new Error(error);
  }
});

export const updateProductFromCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { cartItemId, newQuantity } = req.params;
  validateMongodbid(_id);
  try {
    const updateCart = await Cart.findOne({
      userId: _id,
      _id: cartItemId,
    });
    updateCart.quantity = newQuantity;
    updateCart.save();
    res.status(200).send(updateCart);
  } catch (error) {
    throw new Error(error);
  }
});

export const createOrder = asyncHandler(async (req, res) => {
  let {
    shippingInfo,
    orderItems,
    totalPrice,
    totalPriceAfterDiscount,
    paymentInfo,
  } = req.body;

  const { _id } = req.user;
  try {
    const order = await Order.create({
      shippingInfo,
      totalPrice,
      totalPriceAfterDiscount,
      orderItems,
      paymentInfo,
      user: _id,
    });
    res.status(201).json({
      order,
      success: true,
    });
  } catch (error) {
    throw new Error(error.message);
  }
});

export const getUserOrders = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const orders = await Order.find({ user: _id })
      .populate("user")
      .populate("orderItems.product")
      .populate("orderItems.color");
    res.json(orders);
  } catch (error) {
    throw new Error(error.message);
  }
});

// export const emptyCart = asyncHandler(async (req, res) => {
//   const { _id } = req.user;
//   validateMongodbid(_id);
//   try {
//     const removeCart = await Cart.findOneAndDelete({ orderBy: _id });
//     res.status(200).send(removeCart);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// export const applyCoupon = asyncHandler(async (req, res) => {
//   const { coupon } = req.body;
//   const { _id } = req.user;
//   const validCoupon = await Coupon.findOne({ name: coupon });
//   if (validCoupon === null) throw new Error("Invalid Coupon");
//   const user = await User.findById(_id);
//   let { products, cartTotal } = await Cart.findOne({ orderBy: _id });
//   let totalAfterDiscount = (
//     cartTotal -
//     (cartTotal * validCoupon.discount) / 100
//   ).toFixed(2);
//   await Cart.findOneAndUpdate(
//     { orderBy: _id },
//     {
//       totalAfterDiscount,
//     },
//     {
//       new: true,
//     }
//   );
//   res.json(totalAfterDiscount);
// });

// export const createOrder = asyncHandler(async (req, res) => {
//   const { COD, couponApplied } = req.body;
//   const { _id } = req.user;
//   validateMongodbid(_id);
//   try {
//     if (!COD) throw new Error("Create cash Order Failed");
//     let userCart = await Cart.findOne({ orderBy: _id });
//     let finalAmount = 0;
//     if (couponApplied && userCart.totalAfterDiscount) {
//       finalAmount = userCart.totalAfterDiscount;
//     } else {
//       finalAmount = userCart.cartTotal;
//     }
//     let newOder = await new Order({
//       products: userCart.products,
//       paymentIntent: {
//         id: uniqid(),
//         method: "COD",
//         amount: finalAmount,
//         status: "Cash on Delivery",
//         created: Date.now(),
//         currency: "Rs",
//       },
//       orderBy: _id,
//       orderStatus: "Cash on Delivery",
//     }).save();

//     let update = userCart.products.map((item) => {
//       return {
//         updateOne: {
//           filter: { _id: item.product },
//           update: { $inc: { quantity: -item.count, sold: +item.count } },
//         },
//       };
//     });
//     await Product.bulkWrite(update, {});
//     res.json({ message: "Success" });
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// export const getOrders = asyncHandler(async (req, res) => {
//   const { _id } = req.user;
//   validateMongodbid(_id);
//   try {
//     const userOrders = await Order.findOne({ orderBy: _id })
//       .populate("products.product")
//       .populate("orderBy");
//     res.json(userOrders);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// export const getAllOrders = asyncHandler(async (req, res) => {
//   try {
//     const allUserOrders = await Order.find()
//       .populate("products.product")
//       .populate("orderBy");
//     res.json(allUserOrders);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// export const getOrderById = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   validateMongodbid(id);
//   try {
//     const getOrder = await Order.findOne({ orderBy: id })
//       .populate("products.product")
//       .populate("orderBy");
//     res.json(getOrder);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// export const updateOrderStatus = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;
//   validateMongodbid(id);
//   try {
//     const updateOrderStatus = await Order.findByIdAndUpdate(id, {
//       orderStatus: status,
//       paymentIntent: {
//         status: status,
//       },
//     });
//     res.status(200).send(updateOrderStatus);
//   } catch (error) {
//     throw new Error(error);
//   }
// });
