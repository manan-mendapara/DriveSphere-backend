import { Hono } from "hono";
import { createWishlistController, getWishlistController, getAllWishlistController } from "../controllers/wishlist.controller.js";

const wishlistRouter = new Hono();

wishlistRouter.post("/", createWishlistController);
wishlistRouter.get("/:id", getWishlistController);
wishlistRouter.get("/", getAllWishlistController);

export default wishlistRouter;