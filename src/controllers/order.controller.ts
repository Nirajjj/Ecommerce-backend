import type { Request, Response, NextFunction } from "express";
import { Order } from "../models/order.model.js";
import { catchAsync } from "../utils/catchAsync.js";
import { AppError } from "../utils/appError.js";
import { Cart } from "../models/cart.model.js";

const createOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // Implementation for creating an order
    // these are steps to create or
    const { shippingAddress } = req.body;

    if (!req.user) return next(new AppError(401, "Unauthorized"));
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart || cart.items.length === 0) {
      return next(new AppError(404, "Your cart is empty"));
    }

    for (const item of cart.items) {
      const product = item.product as any;
      if (product.stock < item.quantity) {
        return next(
          new AppError(400, `product ${product.name} is out of stock`),
        );
      }
    }
    const items = cart.items.map((item) => {
      const product = item.product as any;
      return {
        product: item.product._id,
        quantity: item.quantity,
        priceAtPurchase: product.price,
      };
    });
    const order = await Order.create({
      userId,
      items,
      shippingAddress,
      totalPrice: cart.totalPrice,
      paymentStatus: "pending",
    });

    res.status(201).json({
      status: "success",
      message: "Order created successfully",
      data: { order },
    });
  },
);
