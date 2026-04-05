import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { createOrder } from "../controllers/order.controller.js";

const orderRoutes = express.Router();

orderRoutes.post("/", authenticate, createOrder);
orderRoutes.post("/verify", authenticate, createOrder);
// orderRoutes.get("/", authenticate, getOrders);

export default orderRoutes;
