import mongoose from "mongoose";
import dns from "node:dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);
const connectDB = async () => {
  const mongoUrl = process.env.MONGOURL;

  if (!mongoUrl) {
    throw new Error("MONGOURL is not configured");
  }

  if (mongoose.connection.readyState === 1) {
    return;
  }

  await mongoose.connect(mongoUrl);

  console.log("MongoDB connected successfully");
};

export default connectDB;