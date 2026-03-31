import { Schema, model } from "mongoose";

interface Product {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  seller: Schema.Types.ObjectId;
}

const productSchema = new Schema<Product>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      enum: ["electronics", "fashion", "books", "home"],
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

const Product = model<Product>("Product", productSchema);

export { productSchema, Product };
