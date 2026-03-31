import { Product } from "../models/product.js";
import type { Request, Response } from "express";

const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res
      .status(200)
      .json({ products: products, message: "Products fetched successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, category } = req.body;
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getProducts, createProduct };
