import Express from "express";
import { login, logout, register } from "../controllers/authController.js";

const authRouter = Express.Router();

authRouter.post("/signup", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

export default authRouter;
