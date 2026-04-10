import { model, Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

export interface UserDocument {
  // change the name of the interface to avoid confusion with the model change to IUser or
  _id: Schema.Types.ObjectId;
  name: string;
  gender: "male" | "female" | "other";
  phoneNumber: string;
  email: string;
  password: string;
  roles: string[];
  accountStatus: string;
  validatePassword: (passwordByUser: string) => Promise<boolean>;
  createJwtToken: () => Promise<string>;
}
let userSchema = new Schema<UserDocument>(
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
      sparse: true,
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
    roles: {
      type: [String],
      required: true,
      enum: ["customer", "admin", "seller"],
      default: ["customer"],
      validate: [
        {
          // Validator 1: Enforce Admin Isolation
          validator: function (rolesArray: string[]) {
            if (rolesArray.includes("admin")) {
              // If 'admin' is in the array, it MUST be the only role
              return rolesArray.length === 1;
            }

            return true; // Customers and Sellers can be mixed
          },
          message:
            "An Admin cannot hold customer or seller roles simultaneously.",
        },
      ],
    },
    accountStatus: {
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

const User = model<UserDocument>("User", userSchema);

export { userSchema, User };
