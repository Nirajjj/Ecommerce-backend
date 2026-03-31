import { Schema, model } from "mongoose";
interface Order {
  userId: Schema.Types.ObjectId;
  productId: Schema.Types.ObjectId;
  quantity: number;
  totalPrice: number;
  status: "pending" | "shipped" | "delivered" | "cancelled";
}

const orderSchema = new Schema<Order>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
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
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "shipped", "delivered", "cancelled"],
    },
  },
  {
    timestamps: true,
  },
);

const Order = model<Order>("Order", orderSchema);

export { orderSchema, Order };
