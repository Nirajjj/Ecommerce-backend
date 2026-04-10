import { Product } from "../models/product.model.js";
import type { NextFunction, Request, Response } from "express";
import { uploadToCloudinary } from "../utils/cloudImageHandle.js";
import type { UploadApiResponse } from "cloudinary";
import { v2 as cloudinary } from "cloudinary";
import { catchAsync } from "../utils/catchAsync.js";
import { AppError } from "../utils/appError.js";
import mongoose from "mongoose";

// --- CUSTOMER CONTROLLERS ---
const getProducts = catchAsync(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page! as string) || 1;
  const limit = parseInt(req.query.limit! as string) || 10;
  const skip = (page - 1) * limit;
  const products = await Product.find()
    .populate("category", "name description")
    .skip(skip)
    .limit(limit);
  const totalProducts = await Product.countDocuments();
  res.status(200).json({
    status: "success",
    message: "Products fetched successfully",
    data: {
      products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      page,
      limit,
    },
  });
});

const getProductById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.findById(req.params.id).populate(
      "category",
      "name description"
    );

    if (!product) return next(new AppError(404, "Product not found"));

    res.status(200).json({
      status: "success",
      message: "Product fetched successfully",
      data: { product },
    });
  }
);

const searchProducts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query.q as string;
    if (!query) return next(new AppError(400, "Query parameter is required"));

    const page = parseInt(req.query.page! as string) || 1;
    const limit = parseInt(req.query.limit! as string) || 10;
    const skip = (page - 1) * limit;
    const result = await Product.aggregate([
      {
        $match: {
          $or: [
            { name: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } },
          ],
        },
      },
      {
        $facet: {
          products: [{ $skip: skip }, { $limit: limit }],
          totalCount: [{ $count: "count" }],
        },
      },
    ]);

    const products = result[0].products;
    const totalProducts = result[0].totalCount[0]?.count || 0;

    res.status(200).json({
      status: "success",
      message: "Products fetched successfully",
      data: {
        products,
        totalProducts,
        totalPages: Math.ceil(totalProducts / limit),
        page,
        limit,
      },
    });
  }
);
const getProductsByCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const categoryID = req.params.category as string;

    const page = parseInt(req.query.page! as string) || 1;
    const limit = parseInt(req.query.limit! as string) || 10;
    const skip = (page - 1) * limit;
    if (!mongoose.isValidObjectId(categoryID))
      return next(new AppError(400, "Invalid category ID"));

    const categoryObjectId = new mongoose.Types.ObjectId(categoryID);
    const [products, totalProducts] = await Promise.all([
      await Product.find({
        category: categoryID,
      } as any)
        .skip(skip)
        .limit(limit),
      await Product.countDocuments({
        category: categoryObjectId,
      }),
    ]);

    if (products.length === 0)
      return next(new AppError(404, "No products found for this category"));

    res.status(200).json({
      status: "success",
      message: "Category fetched successfully",
      data: {
        products,
        totalProducts,
        totalPages: Math.ceil(totalProducts / limit),
        page,
        limit,
      },
    });
  }
);
// --- SELLER CONTROLLERS ---
const updateProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.findById(req.params.id);

    if (!product) return next(new AppError(404, "Product not found"));

    let keptImages =
      (req.body.images as { url: string; public_id: string }[]) || []; // array of public_ids of images to keep

    if (!req.user) return next(new AppError(401, "Unauthorized"));

    if (req.user._id.toString() !== product?.seller.toString()) {
      return next(new AppError(401, "Unauthorized"));
    }

    if (typeof keptImages === "string") {
      keptImages = JSON.parse(req.body.images);
    }

    // keptImages will return array of ojects with url and public_id, we need to extract public_id from it so write a map function to extract public_id from it
    const keptImageIds = keptImages.map((image) => image.public_id);
    const imagesToDelete = product.images.filter(
      (image) => !keptImageIds.includes(image.public_id)
    );
    // delete images that are not in keptImages from cloudinary
    const deletePromises = imagesToDelete.map((img) =>
      cloudinary.uploader.destroy(img.public_id)
    );

    await Promise.all(deletePromises); // Run in parallel

    // handle new image upload if there is a new image
    const reqFiles = req.files as Express.Multer.File[]; // array of new images uploaded

    const newImages: UploadApiResponse[] = [];

    if (reqFiles && reqFiles.length > 0) {
      const uploadPromises = reqFiles.map((file) => uploadToCloudinary(file));
      const uploadImages = (await Promise.all(
        uploadPromises
      )) as UploadApiResponse[]; // array of uploaded images with url and public_id

      uploadImages.forEach((imageUrl) => {
        newImages.push({
          url: imageUrl.secure_url,
          public_id: imageUrl.public_id,
        } as UploadApiResponse);
      });
    }

    const allImages = [...keptImages, ...newImages];

    const { name, description, price, category, stock } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, category, stock, images: allImages },
      { new: true } // this new option returns the updated document instead of the original
    );

    if (!updatedProduct) return next(new AppError(404, "Product not found"));

    res.status(200).json({
      status: "success",

      message: "Product updated successfully",
      data: { product: updatedProduct },
    });
  }
);
const updateStock = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.stock) return next(new AppError(400, "Stock is required"));

    if (!req.user) return next(new AppError(401, "Unauthorized"));

    const { stock } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) return next(new AppError(404, "Product not found"));

    if (req.user._id.toString() !== product?.seller.toString()) {
      return next(new AppError(401, "Unauthorized"));
    }

    product.stock = stock;
    await product.save();
    res.status(200).json({
      status: "success",
      message: "Product stock updated successfully",
      data: { product },
    });
  }
);
const createProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return next(new AppError(401, "Unauthorized"));

    if (!req.files || (req.files as Express.Multer.File[]).length === 0)
      return next(new AppError(400, "At least one image is required"));

    const files = req.files as Express.Multer.File[]; // array of images uploaded

    const uploadPromises = files.map((file) => uploadToCloudinary(file));
    const uploadImages = (await Promise.all(
      uploadPromises
    )) as UploadApiResponse[]; // array of uploaded images with url and public_id

    const images = uploadImages.map((image) => ({
      url: image.secure_url,
      public_id: image.public_id,
    }));
    const { name, description, price, category, stock } = req.body;

    try {
      const newProduct = new Product({
        name,
        description,
        price,
        category,
        stock,
        images,
        seller: req.user._id,
      });

      await newProduct.save();

      res.status(201).json({
        status: "success",
        message: "Product created successfully",
        data: { product: newProduct },
      });
    } catch (error) {
      const deletePromises = images.map((img) =>
        cloudinary.uploader.destroy(img.public_id)
      );

      await Promise.allSettled(deletePromises);

      return next(new AppError(500, "Failed to create product"));
    }
  }
);

const deleteProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.params.id)
      return next(new AppError(400, "Product ID is required"));

    if (!mongoose.isValidObjectId(req.params.id))
      return next(new AppError(400, "Invalid product ID"));

    if (!req.user) return next(new AppError(401, "Unauthorized"));

    const ProductObject = await Product.findById(req.params.id);

    if (req.user._id.toString() !== ProductObject?.seller.toString()) {
      return next(new AppError(401, "Unauthorized"));
    }

    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) return next(new AppError(404, "Product not found"));

    // delete all images from cloudinary
    for (const image of deletedProduct.images) {
      await cloudinary.uploader.destroy(image.public_id);
    }
    res
      .status(200)
      .json({ status: "success", message: "Product deleted successfully" });
  }
);

const getSellerProducts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;

    if (!userId) return next(new AppError(401, "Unauthorized"));

    const page = parseInt(req.query.page! as string) || 1;
    const limit = parseInt(req.query.limit! as string) || 10;
    const skip = (page - 1) * limit;

    const [products, totalProducts] = await Promise.all([
      await Product.find({ seller: userId }).skip(skip).limit(limit),
      await Product.countDocuments({ seller: userId }),
    ]);

    res.status(200).json({
      status: "success",
      message: "Products fetched successfully",
      data: {
        products,
        totalProducts,
        totalPages: Math.ceil(totalProducts / limit),
        page,
        limit,
      },
    });
  }
);

// --- Admin controllers ---
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
      cloudinary.uploader.destroy(image.public_id)
    );

    await Promise.all(imagePromises);

    res.status(200).json({
      status: "success",
      message: "Product deleted successfully",
      data: { product: deletedProduct },
    });
  }
);

export {
  getProducts,
  createProduct,
  deleteProduct,
  getProductsByCategory,
  getProductById,
  updateProduct,
  searchProducts,
  getSellerProducts,
  updateStock,
  deleteAnyProduct,
};
