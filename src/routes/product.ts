import Express from "express";
import { authenticate, authorize } from "../middleware/auth.js";
import {
  createProduct,
  getProducts,
} from "../controllers/productController.js";

const productRoutes = Express.Router();

productRoutes.post(
  "/",
  authenticate,
  authorize(["admin", "seller"]),
  createProduct,
);
productRoutes.get("/", getProducts);

export default productRoutes;
