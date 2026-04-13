import { updateAvatar, updateProfile } from "../controllers/user.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";
import Express from "express";

const userRoutes = Express.Router();

userRoutes.patch(
  "/profile",
  authenticate,
  authorize(["customer", "seller"]),
  updateProfile
);
userRoutes.patch(
  "/avatar",
  authenticate,
  authorize(["customer", "seller"]),
  upload.single("image"),
  updateAvatar
);

export default userRoutes;
