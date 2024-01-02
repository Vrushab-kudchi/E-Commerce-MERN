import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import { generateToken } from "../config/jwtToken.js";
import validateMongodbid from "../utils/validateMongodbId.js";
import { generateRefreshToken } from "../config/refreshToken.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "./emailCtrl.js";
import crypto from "crypto";

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
    const getUser = await User.findById(id);
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
    const resetUrl = `Hi, Please Follow this link to reset the password. this link is valid till 10 mins from now  <a href='${process.env.DOMAIN}/api/user/reset-password/${token}'>Click Here</a>`;
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
