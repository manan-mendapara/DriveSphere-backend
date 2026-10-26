import { Hono } from "hono";
import { createShowroomController, getShowroomController, getAllShowroomsController } from "../controllers/showroom.controller.js";

const showroomRouter = new Hono();

showroomRouter.post("/", createShowroomController);
showroomRouter.get("/:id", getShowroomController);
showroomRouter.get("/", getAllShowroomsController);

export default showroomRouter;