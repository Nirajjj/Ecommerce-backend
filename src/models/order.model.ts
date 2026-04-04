import { Schema, model } from "mongoose";
interface OrderItem {
  productId: Schema.Types.ObjectId;
  quantity: number;
  price: number;
}
interface Order {
  userId: Schema.Types.ObjectId;
  items: OrderItem[];
  totalPrice: number;
  shippingAddress: string;
  paymentStatus: "pending" | "paid" | "failed";
  status: "pending" | "shipped" | "delivered" | "cancelled";
}

const orderSchema = new Schema<Order>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
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
      enum: ["pending", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

const Order = model<Order>("Order", orderSchema);

export { orderSchema, Order };
