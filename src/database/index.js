import mongoose from "mongoose";
import { DB_NAME } from "../config/constants.js";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
  } catch (error) {
    process.exit(1);
  }
};

export default connectDB;
