import { config } from "dotenv";
config();
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import connectToDb from "./config/db.js";
import authRoutes from "./routes/authentication.routes.js";
import productRoutes from "./routes/product.routes.js";
import { globalErrorHandler } from "./middleware/error.middleware.js";
import categoryRoutes from "./routes/category.routes.js";
import cartRoutes from "./routes/cart.routes.js";

const app = express();
let port = process.env.PORT || 3000;

//MIDDLEWARE
app.use(cookieParser());
app.use(cors({ origin: process.env.HOST_URL || "*", credentials: true })); // how to set credentials to true in cors for development and production environments? In development, you can set credentials to true in CORS to allow cookies to be sent with requests from your frontend (e.g., http://localhost:3000). In production, you should specify the exact origin of your frontend (e.g., https://yourfrontend.com) and set credentials to true to allow cookies to be sent. Here's how you can do it:
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});
// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/cart", cartRoutes);

app.use(globalErrorHandler);

// DB CONNECTION
connectToDb()
  .then(() => {
    app.listen(port, () => console.log(`server started to run on ${port} `));
  })
  .catch((error) => {
    console.error(
      `CRITICAL: Database connection failed. \nError: ${error.message}`,
    );
    process.exit(1);
  });
