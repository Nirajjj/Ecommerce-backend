import type { Request, Response, NextFunction } from "express";
import { Order } from "../models/order.model.js";
import { catchAsync } from "../utils/catchAsync.js";
import { AppError } from "../utils/appError.js";
import { Cart } from "../models/cart.model.js";
import { razorpay } from "../config/razorpay.js";
import crypto from "crypto";
import { RAZORPAY_SECRET, WEBHOOK_SECRET } from "../config/env.js";
import { Product, type ProductDocument } from "../models/product.model.js";
import type { ObjectId } from "mongoose";
import mongoose from "mongoose";
import { stat } from "fs";

const createOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // Implementation for creating an order
    // these are steps to create or
    const { shippingAddress, productId, quantity } = req.body;

    if (!req.user) return next(new AppError(401, "Unauthorized"));

    const userId = req.user._id;

    let orderItems = [];
    let totalPrice = 0;

    if (productId) {
      // --- BUY NOW FLOW ---
      const product = await Product.findById(productId);

      if (!product) {
        return next(new AppError(404, "Product not found"));
      }

      if (product.stock < quantity) {
        return next(new AppError(400, "Insufficient stock available"));
      }

      orderItems = [
        {
          product: product._id,
          quantity,
          priceAtPurchase: product.price,
          seller: product.seller,
          productStatus: "pending",
        },
      ];
    } else {
      // --- CART FLOW ---

      const cart = await Cart.findOne({ user: userId }).populate(
        "items.product"
      );

      if (!cart || cart.items.length === 0) {
        return next(new AppError(404, "Your cart is empty"));
      }

      for (const item of cart.items) {
        const product = item.product as any;

        if (product.stock < item.quantity) {
          return next(
            new AppError(400, `product ${product.name} is out of stock`)
          );
        }
      }
      orderItems = cart.items.map((item) => {
        const product = item.product as any;

        return {
          product: item.product._id,
          quantity: item.quantity,
          priceAtPurchase: product.price,
          seller: product.seller,
          productStatus: "pending",
        };
      });
      totalPrice = cart.totalPrice;
    }

    const order = await Order.create({
      user: String(userId),
      items: orderItems,
      shippingAddress,
      totalPrice: totalPrice,
      paymentStatus: "pending",
      status: "pending",
    });

    try {
      const razorpayOrder = await razorpay.orders.create({
        amount: order.totalPrice * 100,
        currency: "INR",
        receipt: order._id.toString(),
      });

      order.razorpayOrderId = razorpayOrder.id;
      await order.save();
      res.status(201).json({
        status: "success",
        message: "Order created successfully",
        data: {
          order,
          razorpay_order_id: razorpayOrder.id,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
        },
      });
    } catch (error) {
      const deleteOrder = await Order.findByIdAndDelete(order._id);

      return next(
        new AppError(
          500,
          "Failed to initialize payment gateway and create order"
        )
      );
    }
  }
);

const verifyPayment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !orderId
    )
      return next(new AppError(400, "Missing payment verification fields"));

    const order = await Order.findById(orderId);

    if (!order) {
      return next(new AppError(404, "Order not found"));
    }

    if (order.paymentStatus === "paid") {
      return res.status(200).send("Already processed");
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return next(new AppError(400, "Payment verification failed"));
    }

    order.paymentStatus = "paid";
    order.status = "processing";
    order.razorpayPaymentId = razorpay_payment_id;
    await order.save();

    const stockPromises = order.items.map(async (item) => {
      Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity }, // $inc is a mongodb operator that increments the value of a field by a specified amount but does not allow negative values and that - is used to decrement the value of a field by a specified amount
      });
      item.productStatus = "processing";
    });

    await Promise.all(stockPromises);
    await order.save();
    await Cart.findOneAndDelete({ user: order.user } as any);

    res.status(200).json({
      status: "success",
      message: "Payment verified successfully",
      data: {
        order,
      },
    });
  }
);

const getOrders = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return next(new AppError(401, "Unauthorized"));

    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({
      status: "success",
      message: "Orders fetched successfully",
      data: { orders },
    });
  }
);

const getOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params as { id: string };

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new AppError(400, "Invalid order ID"));
    }

    const order = await Order.findById(id);

    if (!order) {
      return next(new AppError(404, "Order not found"));
    }

    res.status(200).json({
      status: "success",
      message: "Order fetched successfully",
      data: { order },
    });
  }
);

const razorpayWebHook = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const webhookSecret = WEBHOOK_SECRET;
    const signature = req.headers["x-razorpay-signature"] as string;

    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(JSON.stringify(req.body))
      .digest("hex");

    if (expectedSignature !== signature) {
      console.error("Webhook signature mismatch. Intrusion attempt.");

      return res.status(400).send("Invalid Signature");
    }

    const event = req.body.event;

    if (event === "order.paid") {
      const razorpay_order_id = req.body.payload.payment.entity.id;
      const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });

      if (!order) return next(new AppError(404, "Order not found"));

      if (order.paymentStatus === "paid")
        return res.status(200).send("Already processed");

      order.paymentStatus = "paid";
      order.status = "processing";
      await order.save();

      const stockPromises = order.items.map(async (item) => {
        return Product.findByIdAndUpdate(item.product, {
          $inc: { stock: -item.quantity },
        });
        item.productStatus = "processing";
      });

      await Promise.all(stockPromises);
      await order.save();
      await Cart.findOneAndDelete({ user: order.user } as any);
      res.status(200).send("webhook received");
    }
  }
);

// --- SELLER CONTROLLERS ---

const getOrdersBySeller = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { sellerId } = req.params as { sellerId: string };

    if (!mongoose.Types.ObjectId.isValid(sellerId)) {
      return next(new AppError(400, "Invalid seller ID"));
    }

    const orders = await Order.find({ seller: sellerId });

    res.status(200).json({
      status: "success",
      message: "Orders fetched successfully",
      data: { orders },
    });
  }
);

const updateOrderStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { orderId, productId, status } = req.body;

    if (!req.user) return next(new AppError(401, "Unauthorized"));

    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return next(new AppError(400, "Invalid order ID"));
    }

    const validStatuses = ["Processing", "Shipped", "Delivered", "Cancelled"];

    if (!validStatuses.includes(status)) {
      return next(new AppError(400, "Invalid status update"));
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return next(new AppError(404, "Order not found"));
    }

    const sellerProduct = order.items.find(
      (item) => item.product.toString() === productId.toString()
    );

    if (!sellerProduct) {
      return next(new AppError(404, "Product not found"));
    }

    if (sellerProduct.seller.toString() !== userId.toString()) {
      return next(
        new AppError(403, "You do not have permission to update this item")
      );
    } else if (order.status === status) {
      return next(new AppError(400, `Order is already ${status}`));
    }

    order.status = status;
    await order.save();
    res.status(200).json({
      status: "success",
      message: "Order status updated successfully",
      data: { order },
    });
  }
);

export {
  createOrder,
  verifyPayment,
  getOrders,
  getOrder,
  razorpayWebHook,
  getOrdersBySeller,
  updateOrderStatus,
};
