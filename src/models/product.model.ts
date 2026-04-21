import mongoose, { Schema, model } from "mongoose";

export interface ProductDocument {
  _id: mongoose.Types.ObjectId;
  name: string;
  description: string;
  price: number;
  category: mongoose.Types.ObjectId;
  mrp: number;
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
    mrp: {
      type: Number,
      validate: {
        validator: function (mrp: number) {
          const product = this as ProductDocument;

          return mrp >= product.price;
        },
        message: "MRP must be greater than or equal to price",
      },
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
