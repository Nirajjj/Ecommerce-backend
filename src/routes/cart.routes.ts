import Express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import {
  addToCart,
  getCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
} from "../controllers/cart.controller.js";

const cartRoutes = Express.Router();

cartRoutes.post("/", authenticate, addToCart);
cartRoutes.get("/", authenticate, getCart);
cartRoutes.patch("/:productId", authenticate, updateCartQuantity);
cartRoutes.delete("/:productId", authenticate, removeFromCart);
cartRoutes.delete("/", authenticate, clearCart);

export default cartRoutes;
