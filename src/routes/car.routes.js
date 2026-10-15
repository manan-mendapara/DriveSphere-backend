
import express from "express";
import { validateCarDelete, validateCarId, validateCarRequest, validateCarUpdate } from "../middleware/car.middleware.js";
import { allCarsController, carbyIdController, createCarController, deleteCarController, updateCarController } from "../controllers/car.controller.js";

const router = express.Router();

// admin car creation routes
router.post("/", validateCarRequest, createCarController);
router.patch("/:id", validateCarUpdate, updateCarController);
router.delete("/:id", validateCarDelete, deleteCarController);


// user routes
router.get("/allcars", allCarsController);
router.get("/find/:id", validateCarId, carbyIdController);

export default router;
