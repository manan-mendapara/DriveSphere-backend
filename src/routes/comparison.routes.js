import express from "express";

import {
  createComparisonController,
  getComparisonController,
  deleteComparisonController,
} from "../controllers/comparison.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createComparisonController);
router.get("/", authMiddleware, getComparisonController);
router.delete("/", authMiddleware, deleteComparisonController);

export default router;
