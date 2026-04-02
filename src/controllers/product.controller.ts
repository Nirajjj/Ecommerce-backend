import { Product } from "../models/product.model.js";
import type { NextFunction, Request, Response } from "express";
import { uploadToCloudinary } from "../utils/cloudImageHandle.js";
import type { UploadApiResponse } from "cloudinary";
import { v2 as cloudinary } from "cloudinary";
import { catchAsync } from "../utils/catchAsync.js";
import { AppError } from "../utils/appError.js";

const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res
      .status(200)
      .json({ products: products, message: "Products fetched successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, category } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, category },
      { new: true }, // this new option returns the updated document instead of the original
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      product: updatedProduct,
      message: "Product updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const createProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("file received", req.file);
    if (!req.file) return next(new AppError(400, "Image is required"));

    let imageUrl = (await uploadToCloudinary(req.file)) as UploadApiResponse;
    console.log("image uploaded to cloudinary", imageUrl);
    const { name, description, price, category, stock } = req.body;
    console.log("product details", {
      name,
      description,
      price,
      category,
      stock,
    });
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock,
      images: [{ url: imageUrl.secure_url, public_id: imageUrl.public_id }],
    });
    await newProduct.save();
    console.log("new product created", newProduct);
    res.status(201).json({ message: "Product created successfully" });
  },
);

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    // delete all images from cloudinary
    for (const image of deletedProduct.images) {
      await cloudinary.uploader.destroy(image.public_id);
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
const getProductsByCategory = async (req: Request, res: Response) => {
  try {
    const category = req.params.category as string;
    const products = await Product.find({ category: category });
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
const searchProducts = async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  getProducts,
  createProduct,
  deleteProduct,
  getProductsByCategory,
  getProductById,
  updateProduct,
  searchProducts,
};
