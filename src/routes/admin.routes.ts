import Express from "express";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { deleteAnyProduct } from "../controllers/admin.controller.js";

const adminRoutes = Express.Router();

adminRoutes.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  deleteAnyProduct,
);

export default adminRoutes;
