import { model, Schema } from "mongoose";
interface Category {
  name: string;
  description: string;
  products: Schema.Types.ObjectId[];
  image: {
    url: String;
    public_id: String;
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
  { timestamps: true },
);

const Category = model<Category>("Category", categorySchema);

export { categorySchema, Category };
