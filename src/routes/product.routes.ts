import Express from "express";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  getProductsByCategory,
  searchProducts,
  updateProduct,
} from "../controllers/product.controller.js";
import upload from "../middleware/multer.middleware.js";

const productRoutes = Express.Router();

productRoutes.post(
  "/",
  authenticate,
  authorize(["admin", "seller"]),
  upload.single("image"),
  createProduct,
);
productRoutes.get("/", getProducts);
productRoutes.get("/category/:category", getProductsByCategory);
productRoutes.get("/search", searchProducts);
productRoutes.get("/:id", getProductById);
productRoutes.put(
  "/:id",
  authenticate,
  authorize(["admin", "seller"]),
  upload.single("image"),
  updateProduct,
);

productRoutes.delete(
  "/:id",
  authenticate,
  authorize(["admin", "seller"]),
  deleteProduct,
);

export default productRoutes;
