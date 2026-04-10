import mongoose, { Schema, model } from "mongoose";

export interface ProductDocument {
  name: string;
  description: string;
  price: number;
  category: mongoose.Types.ObjectId;
  stock: number;
  seller: mongoose.Types.ObjectId;
  images: { url: string; public_id: string }[];
}

const productSchema = new Schema<ProductDocument>(
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
  }
);

const Product = model<ProductDocument>("Product", productSchema);

export { productSchema, Product };
