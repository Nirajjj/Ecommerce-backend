import type { NextFunction, Request, Response } from "express";
import { Category } from "../models/category.model.js";
import { catchAsync } from "../utils/catchAsync.js";
import { AppError } from "../utils/appError.js";
import mongoose from "mongoose";

const getCategories = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const categories = await Category.find();
    res
      .status(200)
      .json({
        status: "success",
        message: "Categories fetched successfully",
        data: { categories },
      });
  },
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
    res
      .status(200)
      .json({
        status: "success",
        message: "Category fetched successfully",
        data: { category },
      });
  },
);

const createCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, description } = req.body;
    const category = await Category.create({ name, description });
    res.status(201).json({ category });
  },
);

const updateCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params as { id: string };
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new AppError(400, "Invalid category ID"));
    }
    const { name, description } = req.body;
    const category = await Category.findByIdAndUpdate(
      id,
      { name, description },
      { new: true },
    );
    if (!category) {
      return next(new AppError(404, "Category not found"));
    }
    res
      .status(200)
      .json({
        status: "success",
        message: "Category updated successfully",
        data: { category },
      });
  },
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
    res
      .status(200)
      .json({
        status: "success",
        message: "Category deleted successfully",
        data: null,
      });
  },
);

export {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
