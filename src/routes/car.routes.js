
import express from "express";
import { validateCarDelete, validateCarRequest, validateCarUpdate } from "../middleware/car.middleware.js";
import { allCarsController, createCarController, deleteCarController, updateCarController } from "../controllers/car.controller.js";

const router = express.Router();

// admin car creation routes
router.post("/", validateCarRequest, createCarController);
router.patch("/:id", validateCarUpdate, updateCarController);
router.delete("/:id", validateCarDelete, deleteCarController);


// user routes
router.get("/allcars", allCarsController);


export default router;
