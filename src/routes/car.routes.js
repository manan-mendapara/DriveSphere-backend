
import express from "express";
import { validateCarRequest } from "../middleware/car.middleware.js";
import { createCarController } from "../controllers/car.controller.js";

const router = express.Router();

router.post("/", validateCarRequest, createCarController);

export default router;
