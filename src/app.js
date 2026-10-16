import express from "express";
import carRoutes from "./routes/car.routes.js";
import userRoutes from "./routes/user.routes.js"
import comparisonRoutes from "./routes/comparison.routes.js";
import wishlistRoutes from "./routes/wishlist.routes.js"
import showroomRoutes from "./routes/showroom.routes.js";
import serviceCenterRoutes from "./routes/serviceCenter.routes.js";
import { errorHandler } from "./middleware/error.handler.middlewar.js";

const app = express();

app.use(express.json());

app.use("/api/user", userRoutes); //user routes api
app.use("/api/cars", carRoutes); //car routes api
app.use("/api/comparison", comparisonRoutes); //comparision routes api
app.use("/api/wishlist", wishlistRoutes); // wishlist routes api
app.use("/api/showrooms", showroomRoutes) // showroom routes api
app.use("/api/service-centers", serviceCenterRoutes); // service-center api
// Register the error handler after routes.
app.use(errorHandler);

export default app;