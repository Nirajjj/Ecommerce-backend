import mongoose, { Schema, model } from "mongoose";

interface Product {
  name: string;
  description: string;
  price: number;
  category: mongoose.Schema.Types.ObjectId;
  stock: number;
  seller: Schema.Types.ObjectId;
  images: { url: string; public_id: string }[];
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
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
    images: {
      type: [
        {
          url: String,
          public_id: String,
        },
      ],
      validate: {
        validator: (images: { url: string; public_id: string }[]) =>
          images.length <= 5,
        message: "A product can have at most 5 images.",
      },
    },
  },
  {
    timestamps: true,
  },
);

const Product = model<Product>("Product", productSchema);

export { productSchema, Product };
