import { model, Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

interface User {
  name: string;
  gender: "male" | "female" | "other";
  phoneNumber: string;
  email: string;
  password: string;
  role: string;
  isActive: string;
  validatePassword: (passwordByUser: string) => Promise<boolean>;
  createJwtToken: () => Promise<string>;
}
let userSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    phoneNumber: {
      type: String,
      unique: true,
      validate(value: string) {
        if (!validator.isMobilePhone(value, "any")) {
          throw new Error("Phone number is not valid");
        }
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error("invalid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      required: true,
      enum: ["customer", "admin", "seller"],
      default: "customer",
    },
    isActive: {
      type: String,
      required: true,
      enum: ["active", "blocked", "suspended"],
      default: "active",
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.validatePassword = function (passwordByUser: string) {
  return bcrypt.compare(passwordByUser, this.password);
};
userSchema.methods.createJwtToken = function () {
  const token = jwt.sign({ id: this._id, role: this.role }, JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

const User = model<User>("User", userSchema);

export { userSchema, User };
