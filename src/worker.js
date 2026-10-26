import { Hono } from "hono";
import { serve } from "@hono/node-server";
import carRoutes from "./routes/car.routes.js";
import userRoutes from "./routes/user.routes.js";
import comparisonRoutes from "./routes/comparison.routes.js";
import wishlistRoutes from "./routes/wishlist.routes.js";
import showroomRoutes from "./routes/showroom.routes.js";
import serviceCenterRoutes from "./routes/serviceCenter.routes.js";

const app = new Hono();

// Health check route
app.get("/", (c) => {
  return c.json({
    success: true,
    message: "DriveSphere backend is running",
  });
});

// API routes
app.use("/api/user", userRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/comparison", comparisonRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/showrooms", showroomRoutes);
app.use("/api/service-centers", serviceCenterRoutes);

export default {
  fetch: serve(app),
};