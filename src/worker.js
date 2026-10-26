import { httpServerHandler } from "cloudflare:node";
import app from "./app.js";

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "DriveSphere backend is running",
  });
});

app.listen(3000);

export default httpServerHandler({ port: 3000 });