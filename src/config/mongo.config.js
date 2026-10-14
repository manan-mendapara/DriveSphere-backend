import dotenv from "dotenv";
import mongoose from "mongoose";
import dns from "node:dns";
dotenv.config();
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
  try {
    const mongourl = process.env.MONGOURL;

    if(!mongourl){
        console.log("mongo url is missing from .env");
    }

    await mongoose.connect(mongourl);
    console.log("MongoDB connected successfully");

  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
    throw error
  }
};

export default connectDB;