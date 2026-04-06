import type { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.js";
import { AppError } from "../utils/appError.js";
import { Product } from "../models/product.model.js";
import cloudinary from "../config/cloudinary.js";
import mongoose from "mongoose";

const deleteAnyProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.params.id)
      return next(new AppError(400, "Product ID is required"));
    if (!mongoose.isValidObjectId(req.params.id))
      return next(new AppError(400, "Invalid product ID"));
    if (!req.user) return next(new AppError(401, "Unauthorized"));

    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) return next(new AppError(404, "Product not found"));

    const imagePromises = deletedProduct.images.map((image) =>
      cloudinary.uploader.destroy(image.public_id),
    );

    await Promise.all(imagePromises);

    res.status(200).json({
      status: "success",
      message: "Product deleted successfully",
      data: { product: deletedProduct },
    });
  },
);

export { deleteAnyProduct };
