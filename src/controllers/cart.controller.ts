import { Cart, cartSchema } from "../models/cart.model.js";
import type { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.js";
import { AppError } from "../utils/appError.js";
import {
  addToCartSchema,
  updateCartSchema,
} from "../validation/cart.validator.js";
import mongoose from "mongoose";
import { Product } from "../models/product.model.js";

const addToCart = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // 1. Edge Validation: Check request body before hitting the DB
    const validation = addToCartSchema.safeParse(req.body);

    if (!validation.success) {
      return next(
        new AppError(
          400,
          validation.error?.issues?.[0]?.message || "Invalid input",
        ),
      );
    }

    // validation.data is now fully typed and sanitized
    const { productId, quantity } = validation.data;
    const product = await Product.findById(productId);
    if (!product) {
      return next(new AppError(404, "Product not found"));
    }
    if (product.stock < quantity) {
      return next(new AppError(400, "Insufficient stock available"));
    }
    if (!req.user) return next(new AppError(401, "Unauthorized"));

    const userId = req.user._id;

    // 2. Business Logic: Find or create the user's cart
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // Create new cart if one doesn't exist
      cart = await Cart.create({
        user: userId,
        items: [{ product: productId, quantity }],
      });
    } else {
      // Check if product already exists in the cart
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId.toString(),
      );

      if (itemIndex > -1) {
        // Product exists, update quantity
        cart.items[itemIndex]!.quantity += quantity;
      } else {
        // New product, push to items array
        cart.items.push({ product: productId as any, quantity });
      }

      await cart.save();
    }

    // 3. Send Response
    res.status(200).json({
      status: "success",
      message: "Product added to cart successfully",
      data: { cart },
    });
  },
);

const getCart = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return next(new AppError(401, "Unauthorized"));
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId }).populate(
      "items.product",
      "name price",
    );
    if (!cart) {
      return next(new AppError(404, "Cart not found"));
    }
    res.status(200).json({
      status: "success",
      message: "Cart fetched successfully",
      data: { cart },
    });
  },
);

const updateCartQuantity = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return next(new AppError(401, "Unauthorized"));
    const userId = req.user._id;
    const validation = updateCartSchema.safeParse({
      params: req.params,
      body: req.body,
    });

    if (!validation.success) {
      return next(
        new AppError(
          400,
          validation.error.issues?.[0]?.message || "Invalid input",
        ),
      );
    }

    const { productId } = validation.data.params;
    const { quantity } = validation.data.body;

    const [product, cart] = await Promise.all([
      Product.findById(productId),
      Cart.findOne({ user: userId }),
    ]);

    // const product = await Product.findById(productId);
    if (!product) return next(new AppError(404, "Product not found"));
    if (!cart) return next(new AppError(404, "Cart not found"));

    if (product.stock < quantity) {
      return next(new AppError(400, "Insufficient stock available"));
    }

    // const cart = await Cart.findOne({ user: userId });

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId.toString(),
    );
    if (itemIndex === -1)
      return next(new AppError(404, "Product not found in cart"));

    cart.items[itemIndex]!.quantity = quantity;
    await cart.save();
    res.status(200).json({
      status: "success",
      message: "Cart updated successfully",
      data: { cart },
    });
  },
);

const removeFromCart = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return next(new AppError(401, "Unauthorized"));
    const userId = req.user._id;
    const productId = req.params.productId;
    if (typeof productId !== "string" || !productId?.trim()) {
      return next(new AppError(400, "Product ID is required"));
    }
    if (!mongoose.isValidObjectId(productId)) {
      return next(new AppError(400, "Invalid product ID"));
    }
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return next(new AppError(404, "Cart not found"));
    }
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId.toString(),
    );
    await cart.save();
    res.status(200).json({
      status: "success",
      message: "Product removed from cart successfully",
      data: { cart },
    });
  },
);

const clearCart = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return next(new AppError(401, "Unauthorized"));
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return next(new AppError(404, "Cart not found"));
    }
    cart.items = [];
    await cart.save();
    res.status(200).json({
      status: "success",
      message: "Cart cleared successfully",
      data: { cart },
    });
  },
);

export { addToCart, getCart, updateCartQuantity, removeFromCart, clearCart };
