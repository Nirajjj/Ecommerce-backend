import Express from "express";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  getProductsByCategory,
  getSellerProducts,
  searchProducts,
  updateProduct,
  updateStock,
} from "../controllers/product.controller.js";
import upload from "../middleware/multer.middleware.js";

const productRoutes = Express.Router();

productRoutes.get(
  "/",
  authenticate,
  authorize(["seller", "customer"]),
  getProducts,
);
productRoutes.get(
  "/category/:category",
  authenticate,
  authorize(["seller", "customer"]),
  getProductsByCategory,
);
productRoutes.get(
  "/search",
  authenticate,
  authorize(["seller", "customer"]),
  searchProducts,
);
productRoutes.get(
  "/:id",
  authenticate,
  authorize(["seller", "customer"]),
  getProductById,
);
productRoutes.put(
  "/:id",
  authenticate,
  authorize(["seller"]),
  upload.array("images", 5), // allow up to 5 images
  updateProduct,
);

productRoutes.post(
  "/",
  authenticate,
  authorize(["seller"]),
  upload.array("images", 5), // allow up to 5 images
  createProduct,
);

productRoutes.delete(
  "/:id",
  authenticate,
  authorize(["seller"]),
  deleteProduct,
);

productRoutes.get(
  "/seller/my-products",
  authenticate,
  authorize(["seller"]),
  getSellerProducts,
);

productRoutes.patch(
  "/stock/:id",
  authenticate,
  authorize(["seller"]),
  updateStock,
);

export default productRoutes;
