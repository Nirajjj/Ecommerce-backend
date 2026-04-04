import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import type { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "../config/env.js";
import type { JwtPayload } from "jsonwebtoken";

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;

    next();
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res
      .status(500)
      .json({ message: "Internal server error", error: errorMessage });
  }
};

// authorize middleware to check if the user has the required role to access the route so that only authorized users can access the route
const authorize = (roles: string[] | string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (typeof roles === "string") {
      if (req.user.role !== roles) {
        return res.status(403).json({ message: "Forbidden" });
      }
    } else {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }
    }

    next();
  };
};

export { authenticate, authorize };
