import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = asyncHandler(async (req, res) => {

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const trimmedName = name.trim().toLowerCase();
  const trimmedEmail = email.trim().toLowerCase();

  if (!trimmedName) {
    throw new ApiError(400, "Invalid name");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(trimmedEmail)) {
    throw new ApiError(400, "Invalid email address");
  }

  const isExistsUser = await User.findOne({ email: trimmedEmail });

  if (isExistsUser) {
    throw new ApiError(400, "User already registered");
  }

  const user = await User.create({
    name: trimmedName,
    email: trimmedEmail,
    password: password,
  });

  user.password = undefined;

  if (!user) {
    throw new ApiError(
      500,
      "Something went wrong !! User not created due to database",
    );
  }

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: user,
  });
});

const loginUser = asyncHandler(async (req, res) => {

  console.log(req.body.email);

  const { email, password } = req.body;


  if (!email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const trimmedEmail = email.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(trimmedEmail)) {
    throw new ApiError(400, "Invalid email address");
  }

  const user = await User.findOne({ email: trimmedEmail });

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  );

  user.password = undefined;

  res.status(200).json({
    success: true,
    message: "User Login successfully",
    token,
    data: user,
  });
});

export { registerUser, loginUser };
