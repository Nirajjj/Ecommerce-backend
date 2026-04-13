import Express from "express";
import {
  getMe,
  login,
  logout,
  upgradeToSeller,
  register,
} from "../controllers/auth.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";

const authRouter = Express.Router();

authRouter.post("/signup", register);
authRouter.post("/login", login);
authRouter.get("/me", authenticate, getMe);
authRouter.post("/logout", logout);
authRouter.post("/upgradeToSeller", authenticate, upgradeToSeller);

export default authRouter;
