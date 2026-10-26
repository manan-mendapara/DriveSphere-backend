import { Hono } from "hono";
import { createServiceCenterController, getServiceCenterController, getAllServiceCentersController } from "../controllers/serviceCenter.controller.js";

const serviceCenterRouter = new Hono();

serviceCenterRouter.post("/", createServiceCenterController);
serviceCenterRouter.get("/:id", getServiceCenterController);
serviceCenterRouter.get("/", getAllServiceCentersController);

export default serviceCenterRouter;