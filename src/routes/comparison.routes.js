import { Hono } from "hono";
import { createComparisonController, getComparisonController, getAllComparisonsController } from "../controllers/comparison.controller.js";

const comparisonRouter = new Hono();

comparisonRouter.post("/", createComparisonController);
comparisonRouter.get("/:id", getComparisonController);
comparisonRouter.get("/comparisons", getAllComparisonsController);

export default comparisonRouter;