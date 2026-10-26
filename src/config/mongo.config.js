import mongoose from "mongoose";
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