import Express from "express";
import {
  getMe,
  login,
  logout,
  register,
} from "../controllers/auth.controller.js";

const authRouter = Express.Router();

authRouter.post("/signup", register);
authRouter.post("/login", login);
authRouter.post("/me", getMe);
authRouter.post("/logout", logout);

export default authRouter;
