import express from "express";
import {
    addToWishlistController,
    getWishlistController,
    removeFromWishlistController,
} from "../controllers/wishlist.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/:carId", authMiddleware, addToWishlistController);
router.get("/", authMiddleware, getWishlistController);
router.delete("/:carId", authMiddleware, removeFromWishlistController);

export default router;