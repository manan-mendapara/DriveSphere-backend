
import express from "express";

import {
  getNearbyServiceCentersController,
} from "../controllers/serviceCenter.controller.js";

const router = express.Router();

router.get("/nearby", getNearbyServiceCentersController);

export default router;
