import Express from "express";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import {
  addToCart,
  getCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
} from "../controllers/cart.controller.js";

const cartRoutes = Express.Router();

cartRoutes.post(
  "/",
  authenticate,
  authorize(["customer", "seller"]),
  addToCart,
);
cartRoutes.get("/", authenticate, authorize(["customer", "seller"]), getCart);
cartRoutes.patch(
  "/:productId",
  authenticate,
  authorize(["customer", "seller"]),
  updateCartQuantity,
);
cartRoutes.delete(
  "/:productId",
  authenticate,
  authorize(["customer", "seller"]),
  removeFromCart,
);
cartRoutes.delete(
  "/",
  authenticate,
  authorize(["customer", "seller"]),
  clearCart,
);

export default cartRoutes;
