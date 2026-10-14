
import express from "express";
import { validateCarRequest, validateCarUpdate } from "../middleware/car.middleware.js";
import { createCarController, updateCarController } from "../controllers/car.controller.js";

const router = express.Router();

router.post("/", validateCarRequest, createCarController);
router.patch("/:id", validateCarUpdate, updateCarController);

export default router;
