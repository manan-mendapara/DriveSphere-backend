
import express from "express";

import {
  getNearbyShowroomsController,
} from "../controllers/showroom.controller.js";

const router = express.Router();

router.get("/nearby", getNearbyShowroomsController);

export default router;
