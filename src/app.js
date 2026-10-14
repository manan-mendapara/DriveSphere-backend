
import express from "express";
import carRoutes from "./routes/car.routes.js";
import { errorHandler } from "./middleware/error.handler.middlewar.js";

const app = express();

app.use(express.json());

app.use("/api/cars", carRoutes);

// Register the error handler after routes.
app.use(errorHandler);

export default app;
