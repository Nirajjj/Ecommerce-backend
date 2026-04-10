import mongoose from "mongoose";
import { Product } from "./src/models/product.model.js";
import { fashionProducts } from "./fashionProducts"; // The 30 objects I gave you
import dotenv from "dotenv";

dotenv.config();

const seedDatabase = async () => {
  try {
    // 1. Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("⏳ Connected to MongoDB...");

    // 2. Optional: Clear existing products to avoid duplicates
    // WARNING: This deletes your current product collection!
    // await Product.deleteMany({});
    // console.log("🗑️  Old products cleared.");

    // 3. Insert the new data
    await Product.insertMany(fashionProducts);
    console.log("✅ 30 Fashion Products successfully added!");

    // 4. Close connection
    mongoose.connection.close();
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
