import mongoose from "mongoose";
import { MONGODB_URI } from "./env.js";

const connectToDb = async () => {
  await mongoose.connect(MONGODB_URI as string);
  console.log("connected to db");
};

export default connectToDb;
