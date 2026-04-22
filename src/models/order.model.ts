import mongoose, { Schema, model } from "mongoose";

interface OrderItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
  priceAtPurchase: number;
  seller: mongoose.Types.ObjectId;
  productStatus:
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "returned";
}
interface Order {
  user: mongoose.Types.ObjectId;
  items: OrderItem[];
  totalPrice: number;
  shippingAddress: string;
  paymentStatus: "pending" | "paid" | "failed";
  status: "pending" | "shipped" | "delivered" | "cancelled" | "processing";
  razorpayOrderId: string;
  razorpayPaymentId: string;
}

const orderSchema = new Schema<Order>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        priceAtPurchase: {
          type: Number,
          required: true,
          min: 0,
        },
        seller: { type: Schema.Types.ObjectId, ref: "User" },
        productStatus: {
          type: String,
          required: true,
          enum: [
            "pending",
            "processing",
            "shipped",
            "delivered",
            "cancelled",
            "returned",
          ],
          default: "pending",
        },
      },
    ],
    shippingAddress: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentStatus: {
      type: String,
      required: true,
      enum: ["pending", "paid", "failed"],
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "shipped", "delivered", "cancelled", "processing"],
      default: "pending",
    },
    razorpayOrderId: {
      type: String,
    },
    razorpayPaymentId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Order = model<Order>("Order", orderSchema);

export { orderSchema, Order };
