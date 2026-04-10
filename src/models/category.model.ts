import mongoose, { model, Schema } from "mongoose";

interface Category {
  name: string;
  description: string;
  image: {
    url: string;
    public_id: string;
  };
}

const categorySchema = new Schema<Category>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    description: { type: String, required: true },
    image: {
      url: String,
      public_id: String,
    },
  },
  { timestamps: true }
);

const Category = model<Category>("Category", categorySchema);

export { categorySchema, Category };
