
import express from "express";
import carRoutes from "./routes/car.routes.js";
import userRoutes from "./routes/user.routes.js"
import comparisonRoutes from "./routes/comparison.routes.js";
import { errorHandler } from "./middleware/error.handler.middlewar.js";

const app = express();

app.use(express.json());

app.use("/api/user", userRoutes); //user routes api
app.use("/api/cars", carRoutes); //car routes apis
app.use("/api/comparison", comparisonRoutes); //comparision routes api

// Register the error handler after routes.
app.use(errorHandler);

export default app;