import mongoose from "mongoose";

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("connected to db");
  } catch (error) {
    console.log(error);
  }
};

export default connectToDb;
