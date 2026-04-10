import Express from "express";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/category.controller.js";
import upload from "../middleware/multer.middleware.js";
import { deleteAnyProduct } from "../controllers/product.controller.js";

export const categoryRoutes = Express.Router();

categoryRoutes.get("/", authenticate, getCategories);

// --- ADMIN ROUTES ---
categoryRoutes.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  deleteAnyProduct
);
categoryRoutes.get(
  "/categories",
  authenticate,
  authorize(["admin"]),
  getCategories
);
categoryRoutes.post(
  "/",
  authenticate,
  authorize(["admin"]),
  upload.single("image"),
  createCategory
);
categoryRoutes.put(
  "category/:id",
  authenticate,
  authorize(["admin"]),
  updateCategory
);
categoryRoutes.delete(
  "category/:id",
  authenticate,
  authorize(["admin"]),
  deleteCategory
);
categoryRoutes.get(
  "category/:id",
  authenticate,
  authorize(["admin"]),
  getCategoryById
);
export default categoryRoutes;
