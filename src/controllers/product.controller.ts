import { Product } from "../models/product.model.js";
import type { NextFunction, Request, Response } from "express";
import { uploadToCloudinary } from "../utils/cloudImageHandle.js";
import type { UploadApiResponse } from "cloudinary";
import { v2 as cloudinary } from "cloudinary";
import { catchAsync } from "../utils/catchAsync.js";
import { AppError } from "../utils/appError.js";
import { Category } from "../models/category.model.js";
import mongoose from "mongoose";

const getProducts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const products = await Product.find().populate(
      "category",
      "name description",
    );
    res.status(200).json({
      status: "success",
      message: "Products fetched successfully",
      data: { products },
    });
  },
);

const getProductById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.findById(req.params.id).populate(
      "category",
      "name description",
    );
    if (!product) return next(new AppError(404, "Product not found"));

    res.status(200).json({
      status: "success",
      message: "Product fetched successfully",
      data: { product },
    });
  },
);

const updateProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let product = await Product.findById(req.params.id);
    if (!product) return next(new AppError(404, "Product not found"));
    let keptImages = req.body.images as { url: string; public_id: string }[]; // array of public_ids of images to keep
    if (typeof keptImages === "string") {
      keptImages = JSON.parse(req.body.images);
    }
    // keptImages will return array of ojects with url and public_id, we need to extract public_id from it so write a map function to extract public_id from it
    const keptImageIds = keptImages.map((image) => image.public_id);
    const imagesToDelete = product.images.filter(
      (image) => !keptImageIds.includes(image.public_id),
    );
    // delete images that are not in keptImages from cloudinary
    const deletePromises = imagesToDelete.map((img) =>
      cloudinary.uploader.destroy(img.public_id),
    );
    await Promise.all(deletePromises); // Run in parallel

    // handle new image upload if there is a new image
    const reqFiles = req.files as Express.Multer.File[]; // array of new images uploaded

    let newImages: UploadApiResponse[] = [];
    if (reqFiles && reqFiles.length > 0) {
      const uploadPromises = reqFiles.map((file) => uploadToCloudinary(file));
      const uploadImages = (await Promise.all(
        uploadPromises,
      )) as UploadApiResponse[]; // array of uploaded images with url and public_id
      uploadImages.forEach((imageUrl) => {
        newImages.push({
          url: imageUrl.secure_url,
          public_id: imageUrl.public_id,
        } as UploadApiResponse);
      });
    }

    const allImages = [, ...keptImages, ...newImages];
    console.log(allImages);
    const { name, description, price, category, stock } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, category, stock, images: allImages },
      { new: true }, // this new option returns the updated document instead of the original
    );
    if (!updatedProduct) return next(new AppError(404, "Product not found"));

    res.status(200).json({
      status: "success",

      message: "Product updated successfully",
      data: { product: updatedProduct },
    });
  },
);

const createProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.files) return next(new AppError(400, "Image is required"));
    const files = req.files as Express.Multer.File[]; // array of images uploaded
    const uploadPromises = files.map((file) => uploadToCloudinary(file));
    const uploadImages = (await Promise.all(
      uploadPromises,
    )) as UploadApiResponse[]; // array of uploaded images with url and public_id

    const images = uploadImages.map((image) => ({
      url: image.secure_url,
      public_id: image.public_id,
    }));
    const { name, description, price, category, stock } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock,
      images,
    });
    await newProduct.save();

    res.status(201).json({
      status: "success",
      message: "Product created successfully",
      data: { product: newProduct },
    });
  },
);

const deleteProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return next(new AppError(404, "Product not found"));

    // delete all images from cloudinary
    for (const image of deletedProduct.images) {
      await cloudinary.uploader.destroy(image.public_id);
    }
    res
      .status(200)
      .json({ status: "success", message: "Product deleted successfully" });
  },
);

const getProductsByCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const categoryID = req.params.category as string;
    if (!mongoose.isValidObjectId(categoryID))
      return next(new AppError(400, "Invalid category ID"));

    const products = await Product.find({
      category: categoryID,
    } as any).populate("category", "name description");
    if (products.length === 0)
      return next(new AppError(404, "No products found for this category"));
    res.status(200).json({
      status: "success",
      message: "Category fetched successfully",
      data: { products },
    });
  },
);

const searchProducts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query.q as string;
    if (!query) return next(new AppError(400, "Query parameter is required"));
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });
    res.status(200).json({
      status: "success",
      message: "Products fetched successfully",
      data: { products },
    });
  },
);

export {
  getProducts,
  createProduct,
  deleteProduct,
  getProductsByCategory,
  getProductById,
  updateProduct,
  searchProducts,
};
