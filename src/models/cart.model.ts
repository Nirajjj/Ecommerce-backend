import mongoose from "mongoose";
import { model, Schema } from "mongoose";

interface CartItem {
  product: mongoose.Schema.Types.ObjectId;
  quantity: number;
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

interface Cart {
  user: mongoose.Schema.Types.ObjectId;
  items: CartItem[];
  totalPrice: number;
}

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

const Cart = model<Cart>("Cart", cartSchema);

export { cartSchema, Cart };
