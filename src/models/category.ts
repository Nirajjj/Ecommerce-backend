import { model, Schema } from "mongoose";
interface Category {
  name: string;
  description: string;
  products: Schema.Types.ObjectId[];
}

const categorySchema = new Schema<Category>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

const Category = model<Category>("Category", categorySchema);

export { categorySchema, Category };
