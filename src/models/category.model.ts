import { model, Schema } from "mongoose";
interface Category {
  name: string;
  description: string;
  products: Schema.Types.ObjectId[];
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
  },
  { timestamps: true },
);

const Category = model<Category>("Category", categorySchema);

export { categorySchema, Category };
