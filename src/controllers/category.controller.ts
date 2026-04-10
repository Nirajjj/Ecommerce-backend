import type { NextFunction, Request, Response } from "express";
import { Category } from "../models/category.model.js";
import { catchAsync } from "../utils/catchAsync.js";
import { AppError } from "../utils/appError.js";
import mongoose from "mongoose";
import { uploadToCloudinary } from "../utils/cloudImageHandle.js";
import type { UploadApiResponse } from "cloudinary";
import cloudinary from "../config/cloudinary.js";

const getCategories = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const categories = await Category.find();

    res.status(200).json({
      status: "success",
      message: "Categories fetched successfully",
      data: { categories },
    });
  }
);

const getCategoryById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params as { id: string };

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new AppError(400, "Invalid category ID"));
    }

    const category = await Category.findById(id);

    if (!category) {
      return next(new AppError(404, "Category not found"));
    }

    res.status(200).json({
      status: "success",
      message: "Category fetched successfully",
      data: { category },
    });
  }
);

const createCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, description } = req.body;

    if (!req.file) return next(new AppError(400, "Image is required"));

    const file = req.file as Express.Multer.File; // array of images uploaded
    const uploadImage = (await uploadToCloudinary(file)) as UploadApiResponse;
    const image = {
      url: uploadImage.secure_url,
      public_id: uploadImage.public_id,
    };

    try {
      const category = await Category.create({ name, description, image });

      res.status(201).json({ category });
    } catch (error) {
      await cloudinary.uploader.destroy(uploadImage.public_id);

      return next(new AppError(500, "Failed to create category"));
    }
  }
);

const updateCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params as { id: string };

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new AppError(400, "Invalid category ID"));
    }

    const { name, description } = req.body;
    const category = await Category.findById(id);

    if (!category) {
      return next(new AppError(404, "Category not found"));
    }

    if (name) {
      category.name = name;
    }

    if (description) {
      category.description = description;
    }

    const oldImagePublicId = category.image.public_id;

    if (req.file) {
      const file = req.file as Express.Multer.File; // array of images uploaded
      const uploadImage = (await uploadToCloudinary(file)) as UploadApiResponse;
      const image = {
        url: uploadImage.secure_url,
        public_id: uploadImage.public_id,
      };

      category.image = image;
      await category.save();
    }

    await cloudinary.uploader.destroy(oldImagePublicId);

    res.status(200).json({
      status: "success",
      message: "Category updated successfully",
      data: { category },
    });
  }
);

const deleteCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params as { id: string };

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new AppError(400, "Invalid category ID"));
    }

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return next(new AppError(404, "Category not found"));
    }

    res.status(200).json({
      status: "success",
      message: "Category deleted successfully",
      data: null,
    });
  }
);

export {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
