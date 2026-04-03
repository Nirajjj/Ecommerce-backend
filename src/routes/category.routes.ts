import Express from "express";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/category.controller.js";

const categoryRoutes = Express.Router();

categoryRoutes.post("/", authenticate, authorize(["admin"]), createCategory);
categoryRoutes.get("/", getCategories);
categoryRoutes.get("/:id", getCategoryById);
categoryRoutes.put("/:id", authenticate, authorize(["admin"]), updateCategory);
categoryRoutes.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  deleteCategory,
);
export default categoryRoutes;
