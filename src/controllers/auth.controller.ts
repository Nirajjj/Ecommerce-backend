import { User } from "../models/user.model.js";
import type { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { catchAsync } from "../utils/catchAsync.js";
import { AppError } from "../utils/appError.js";

const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, role } = req.body;
    //check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return next(new AppError(400, "User already exists. login instead."));

    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashed password", hashedPassword);
    //create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "customer",
    });
    await newUser.save();
    console.log("new user created", newUser);
    // send token to the user
    const token = await newUser.createJwtToken();
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      data: { user: newUser },
    });
  },
);

const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // collect email and password from the request body
    const { email, password } = req.body;
    // check if the user exists in the database
    const user = await User.findOne({ email });
    console.log("user found", user);
    if (!user) return next(new AppError(400, "Invalid email or password"));

    // validate the password
    const isPasswordValid = await user.validatePassword(password);
    console.log(
      "is password valid",
      isPasswordValid,
      "password by user",
      password,
      "hashed password",
      user.password,
    );
    if (!isPasswordValid)
      return next(new AppError(400, "Invalid email or password"));

    // send token to the user
    const token = await user.createJwtToken();
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      data: { user },
    });
  },
);

const logout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({
      status: "success",
      message: "User logged out successfully",
      data: null,
    });
  },
);

export { register, login, logout };
