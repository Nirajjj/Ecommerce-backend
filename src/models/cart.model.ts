import type { NextFunction } from "express";
import mongoose, { type CallbackError } from "mongoose";
import { model, Schema } from "mongoose";

interface CartItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
}
interface Cart {
  user: mongoose.Types.ObjectId;
  items: CartItem[];
  totalPrice: number;
}

const cartItemSchema = new Schema<CartItem>({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

const cartSchema = new Schema<Cart>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  items: [cartItemSchema], // this concept of embedding cart items inside the cart document allows for easier retrieval and management of the cart's contents. Each item in the cart is represented as a subdocument, which can be easily accessed and manipulated when needed.
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
});

cartSchema.pre("save", async function () {
  const cart = this;

  // If items haven't changed, don't waste CPU cycles
  if (!cart.isModified("items")) return;

  // 1. Populate product prices if they aren't already there
  // (Or fetch them manually from the Product model)
  await cart.populate("items.product", "price");

  // 2. Calculate total using reduce
  cart.totalPrice = cart.items.reduce((acc, item: any) => {
    // Check if product exists (defensive coding)
    const price = item.product?.price || 0;

    return acc + price * item.quantity;
  }, 0);
});
const Cart = model<Cart>("Cart", cartSchema);

export { cartSchema, Cart };
