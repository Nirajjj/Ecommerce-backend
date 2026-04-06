import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import {
  createOrder,
  getOrder,
  getOrders,
  getOrdersBySeller,
  updateOrderStatus,
  verifyPayment,
} from "../controllers/order.controller.js";

const orderRoutes = express.Router();

orderRoutes.post("/", authenticate, createOrder);
orderRoutes.post("/verify", authenticate, verifyPayment);
orderRoutes.get("/", authenticate, getOrders);
orderRoutes.get("/:id", authenticate, getOrder);

// --- SELLER ROUTES ---
orderRoutes.get("/seller/:sellerId", authenticate, getOrdersBySeller);
orderRoutes.patch("/:orderId/status", authenticate, updateOrderStatus);

export default orderRoutes;
