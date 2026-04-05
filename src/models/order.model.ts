import mongoose, { Schema, model } from "mongoose";
interface OrderItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
  priceAtPurchase: number;
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
      required: true,
    },
    razorpayPaymentId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Order = model<Order>("Order", orderSchema);

export { orderSchema, Order };
