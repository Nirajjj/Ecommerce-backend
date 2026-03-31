console.log("backend running...");
import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";
import connectToDb from "./config/db.js";
import authRoutes from "./routes/authentication.js";
import productRoutes from "./routes/product.js";

const app = express();
let port = process.env.PORT || 3000;

//MIDDLEWARE
app.use(cors({ origin: process.env.HOST_URL || "*" }));
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

// DB CONNECTION
connectToDb()
  .then(() => {
    app.listen(port, () => console.log(`server started to run on ${port} `));
  })
  .catch((error) => {
    console.log(`connection failed ${error}`);
  });
