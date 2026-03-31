import { User } from "../models/user.js";
import bcrypt from "bcrypt";

const register = async (req: any, res: any) => {
  try {
    const { name, email, password } = req.body;
    //check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists. login instead." });
    }
    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashed password", hashedPassword);
    //create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    console.log("new user created", newUser);
    // send token to the user
    const token = await newUser.createJwtToken();
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req: any, res: any) => {
  try {
    // collect email and password from the request body
    const { email, password } = req.body;
    // check if the user exists in the database
    const user = await User.findOne({ email });
    console.log("user found", user);
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    // validate the password
    const isPasswordValid = await user.validatePassword(password);
    console.log(
      "is password valid",
      isPasswordValid,
      "password by user",
      password,
      "hashed password",
      user.password,
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    // send token to the user
    const token = await user.createJwtToken();
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const logout = async (req: any, res: any) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export { register, login, logout };
