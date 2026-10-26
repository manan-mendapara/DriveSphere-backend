import { httpServerHandler } from "cloudflare:node";
import app from "./app.js";
import connectDB from "./config/mongo.config.js";

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "DriveSphere backend is running",
  });
});

await connectDB();

app.listen(3000);

export default httpServerHandler({ port: 3000 });