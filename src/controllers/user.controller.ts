import { User } from "../models/user.model.js";
import type { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { catchAsync } from "../utils/catchAsync.js";
import { AppError } from "../utils/appError.js";
import { uploadToCloudinary } from "../utils/cloudImageHandle.js";
import type { UploadApiResponse } from "cloudinary";
import cloudinary from "../config/cloudinary.js";

const updateProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, roles } = req.body;
    const userId = req.user?._id;
    const user = await User.findById(userId);
    if (!user) {
      return next(new AppError(400, "User not found"));
    }

    if (name) {
      user.name = name;
    }

    if (email) {
      user.email = email;
    }

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    if (roles) {
      user.roles = roles;
    }

    await user.save();
    res.status(200).json({
      status: "success",
      message: "Profile updated successfully",
      data: user,
    });
  }
);

const updateAvatar = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // const { avatar } = req.body;
    console.log("updateAvatar");
    const userId = req.user?._id;
    const user = await User.findById(userId);
    if (!user) {
      return next(new AppError(400, "User not found"));
    }

    console.log(req.file);
    if (!req.file) return next(new AppError(400, "Image is required"));

    if (
      user.avatar &&
      user.avatar.url !==
        "https://res.cloudinary.com/dbozdghfi/image/upload/v1776072179/default_avatar_pmp8qj.jpg"
    ) {
      await cloudinary.uploader.destroy(user.avatar.public_id);
    }

    const file = req.file as Express.Multer.File; // array of images uploaded

    const upload = (await uploadToCloudinary(file)) as UploadApiResponse;

    const image = {
      url: upload.secure_url,
      public_id: upload.public_id,
    };
    user.avatar = image;
    await user.save();
    // delte old image if exists

    res.status(200).json({
      status: "success",
      message: "Avatar updated successfully",
      data: user,
    });
  }
);

export { updateProfile, updateAvatar };
